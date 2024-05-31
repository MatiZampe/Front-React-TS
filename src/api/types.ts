export interface KeyValuePair {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
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
    FirstName: string,
    LastName: string,
    FullName: string,
    userType: UserTypeEnum,
    Active: boolean;
}   

export interface ApiListResponse<T> {
    items: T[];
    totalCount: number;
}


export interface Branch {
    id: string,
    Name: string,
    Description: string,
    StreetNumber: number,
    Street: string,
    CityId: string,
    MenuId: string,
    City: City,
    Menu: Menu;
}   

export interface Category {
    id: string,
    Name: string,
    Description: string,
    ShowCategory: boolean,
    Products: Product[];
}   

export interface City {
    id: string,
    Name: string,
    ZipCode: string,
    StateId: string,
    State: State,
    Branches: Branch[];
}   

export interface Menu {
    id: string,
    Name: string,
    BranchId: string,
    Branch: Branch;
}

export enum StatusEnum {
    Active,
    Inactive
}

export interface Product {
    id: string,
    Name: string,
    Description: string,
    ShowProduct: boolean,
    Status: StatusEnum,
    Order: number,
    CashPrice: number,
    CardPrice: number,
    Subtitle: string,
    Code: string,
    CategoryId: string,
    Category: Category;
}

export interface State {
    id: string,
    Name: string,
    Citiies: City[];
}