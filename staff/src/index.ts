import { Staff } from "./main";

try {
    const staff = new Staff();
    staff.execute();
} catch(e) {
    console.error(e);
}