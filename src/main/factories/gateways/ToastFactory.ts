import { Toast } from "@/domain"
import { ReactToastifyAdapter } from "@/infra/gateways/toast-adapter"

export const makeToastAdapter = (): Toast => {
  return new ReactToastifyAdapter()
}