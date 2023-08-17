import { Toast, TokenAuthentication } from "..";

export interface ILoginFormProps {
  authService: TokenAuthentication
  showToast: Toast['showToast']
}
