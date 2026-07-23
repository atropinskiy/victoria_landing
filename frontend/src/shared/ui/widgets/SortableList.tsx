"use client"

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import type { ReactNode } from "react"

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { useState } from "react"

import { cn } from "@/shared/lib/utils"

interface SortableListProps<T> {
  items: T[]
  getId: (item: T) => string | number
  onReorder: (items: T[]) => void
  renderItem: (item: T) => ReactNode
  isSelected?: (item: T) => boolean
}

const ROW_CLASSNAME =
  "group flex touch-none items-center gap-3 border-b border-l-4 border-border border-l-transparent bg-white px-3 py-1.5 last:border-b-0 cursor-grab select-none active:cursor-grabbing"

function RowContent({ children, dimmed }: { children: ReactNode; dimmed?: boolean }) {
  return (
    <div className={cn("flex flex-1 items-center gap-3", dimmed && "opacity-40")}>
      <GripVertical className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
      <div className="flex flex-1 items-center justify-between gap-2">{children}</div>
    </div>
  )
}

interface SortableRowProps {
  id: string | number
  children: ReactNode
  selected?: boolean
}

function SortableRow({ id, children, selected }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(ROW_CLASSNAME, selected && "border-l-primary bg-muted")}
    >
      <RowContent dimmed={isDragging}>{children}</RowContent>
    </li>
  )
}

export function SortableList<T>({
  items,
  getId,
  onReorder,
  renderItem,
  isSelected,
}: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const activeItem = items.find((item) => getId(item) === activeId)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((item) => getId(item) === active.id)
    const newIndex = items.findIndex((item) => getId(item) === over.id)

    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(getId)} strategy={verticalListSortingStrategy}>
        <ul className="overflow-hidden rounded-sm border border-border bg-white">
          {items.map((item) => (
            <SortableRow key={getId(item)} id={getId(item)} selected={isSelected?.(item)}>
              {renderItem(item)}
            </SortableRow>
          ))}
        </ul>
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          <div className={cn(ROW_CLASSNAME, "rounded-sm border-b-0 shadow-lg")}>
            <RowContent>{renderItem(activeItem)}</RowContent>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
