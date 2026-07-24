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
  expandedId?: string | number | null
  renderExpanded?: (item: T) => ReactNode
  onDragStart?: () => void
}

const ROW_CLASSNAME =
  "group flex touch-none items-center gap-3 bg-white px-3 py-1.5 cursor-grab select-none active:cursor-grabbing"

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
  expanded?: boolean
  expandedContent?: ReactNode
}

function SortableRow({ id, children, expanded, expandedContent }: SortableRowProps) {
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
      className={"border-border border-b border-l-4 border-l-transparent bg-white last:border-b-0"}
    >
      <div {...attributes} {...listeners} className={ROW_CLASSNAME}>
        <RowContent dimmed={isDragging}>{children}</RowContent>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-border border-t px-5 py-6">{expandedContent}</div>
        </div>
      </div>
    </li>
  )
}

export function SortableList<T>({
  items,
  getId,
  onReorder,
  renderItem,
  isSelected,
  expandedId,
  renderExpanded,
  onDragStart,
}: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const [sortedItems, setSortedItems] = useState(items)
  const [prevItems, setPrevItems] = useState(items)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  if (items !== prevItems) {
    setPrevItems(items)
    setSortedItems(items)
  }

  const activeItem = sortedItems.find((item) => getId(item) === activeId)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id)
    onDragStart?.()
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const oldIndex = sortedItems.findIndex((item) => getId(item) === active.id)
    const newIndex = sortedItems.findIndex((item) => getId(item) === over.id)
    const reordered = arrayMove(sortedItems, oldIndex, newIndex)

    setSortedItems(reordered)
    onReorder(reordered)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortedItems.map(getId)} strategy={verticalListSortingStrategy}>
        <ul className="border-border overflow-hidden rounded-sm border bg-white">
          {sortedItems.map((item) => {
            const id = getId(item)
            const expanded = expandedId != null && id === expandedId

            return (
              <SortableRow
                key={id}
                id={id}
                selected={isSelected?.(item)}
                expanded={expanded}
                expandedContent={renderExpanded?.(item)}
              >
                {renderItem(item)}
              </SortableRow>
            )
          })}
        </ul>
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          <div className={cn(ROW_CLASSNAME, "rounded-sm shadow-lg")}>
            <RowContent>{renderItem(activeItem)}</RowContent>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
