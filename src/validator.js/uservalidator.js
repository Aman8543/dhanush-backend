const validator = require("validator");
const uservalidator=(data)=>{



     const mandatoryField = ['name',"phone",'password',"address"];

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Some Field Missing");

    if(!validator.isMobilePhone(data.phone))
        throw new Error("Invalid phone");

    if(!validator.isStrongPassword(data.password))
        throw new Error("Week Password");


}

module.exports = uservalidator;