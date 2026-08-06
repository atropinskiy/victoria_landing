export {
  useServices,
  useServiceCreate,
  useServiceUpdate,
  useServiceOrder,
  useServiceDelete,
} from "@/entities/service/api/useServices"

export { type Service } from "@/entities/service/model/types"

export { getServices } from "@/entities/service/api/getServices"
export { revalidateServices } from "@/entities/service/api/actions"
