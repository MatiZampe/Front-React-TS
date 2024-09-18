export interface KeyValuePair {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface FilterItem {
    field: string;
    value: any;
  }
  
  export interface ApiRange {
    start: number;
    end: number;
  }
  
  export interface Sort {
    field: string;
    isAscending: boolean;
  }
  
  export enum AlternativeOperators {
    StringContains = 1,
    DateTime,
  }
  
  export type PatchOperation =
    | "add"
    | "remove"
    | "replace"
    | "copy"
    | "move"
    | "test";
  
  export interface PatchObject {
    path: string;
    op: PatchOperation;
    value: any;
  }

export interface AuthResponse {
    authToken: {
        token: string;
        expiresIn: number;
    };
    tokenType: string;
    authState: ApplicationUser;
    error: {
        code: string;
        description: string;
    };
}

export enum UserTypeEnum {
    Admin,
    User
}

export interface ApplicationUser {
    id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    userType: UserTypeEnum,
    active: boolean;
}   

export interface ApiListResponse<T> {
    items: T[];
    totalCount: number;
}


export interface Branch {
    id: string,
    name: string,
    description: string,
    streetNumber: number,
    street: string,
    cityId: string,
    menuId: string,
    city: City,
    menu: Menu;
}   

export interface Category {
    id: string,
    name: string,
    description: string,
    showCategory: boolean,
    products: Product[],
    menuId: string,
    menu: Menu,
    subCategories: Category[],
    parentCategoryId: string,
    parentCategory: Category;
}   

export interface City {
    id: string,
    name: string,
    zipCode: string,
    stateId: string,
    state: State,
    branches: Branch[];
}   

export interface Menu {
    id: string,
    name: string,
    branchId: string,
    branch: Branch,
    categories: Category[];
}

export enum StatusEnum {
    Active,
    Inactive
}

export interface Product {
    id: string,
    name: string,
    description: string,
    showProduct: boolean,
    status: StatusEnum,
    order: number,
    cashPrice: number,
    cardPrice: number,
    subtitle: string,
    code: string,
    categoryId: string,
    category: Category;
    productImage: string;
}

export interface State {
    id: string,
    name: string,
    cities: City[];
}