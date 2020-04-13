export declare class DBService {
    private sequelize;
    static dbInstance: any;
    constructor();
    getContacts(): Promise<any>;
    addContact(picture: string, name: string, roles: any, isActive: boolean, telephone: string): Promise<any>;
    deleteContact(id: string): Promise<any>;
    setContact(id: string, picture: string, name: string, roles: any, isActive: boolean, telephone: string): Promise<any>;
    private handleRoles;
}
