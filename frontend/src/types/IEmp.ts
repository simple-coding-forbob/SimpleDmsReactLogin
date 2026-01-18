export interface IEmp {
    eno?: number;
    ename: string;
    job: string;
    manager: string | number;
    hiredate: string;
    salary: string | number;
    commission?: string | number | null;
    dno?: string | number;
}