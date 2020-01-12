import { Degree } from './Degree';

export class Relationship {
    "id": number;
    "teacherId": number;
    "matterId": number;
    "degrees": {
        "degreeId":number;
        "classes": {
            "classId": number;
        }[];
    }[];
}