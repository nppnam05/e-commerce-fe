export interface User {
  id: string;
  userName: string;
  email: string;
  displayName: string;
  phone: string;
  status: string;
  role: string;
  roleName?: string;
  createdBy: string;
  createdOn: string;
  modifiedOn: string;
  modifiedBy: string;
}