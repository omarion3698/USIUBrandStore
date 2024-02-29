const {checkNameExists, checkEmailExists, checkEmailUSIU, checkPassword, checkRoom, calculatePrice, calculatePrices, calculateTotal} = require('./validate');     

//check if email exists (2 tests)
test('checkEmailExists: thisemail@usiu.ac.ke does not exist', () => {
    expect(checkEmailExists('thisemail@usiu.ac.ke')).toBe("Email doesn't exist!");
});
test('checkEmailExists: iabdalla@usiu.ac.ke does exist', () => {
    expect(checkEmailExists('iabdalla@usiu.ac.ke')).toBe("Email already exists!");
}); 

//check if email is a USIU email (2 tests)
test('checkEmailUSIU: iabdalla@usiu.ac.ke is the right format', () => {
    expect(checkEmailUSIU('iabdalla@usiu.ac.ke')).toBe("Valid email!");
});
test('checkEmailUSIU: iabdalla@google.com is the wrong format', () => {
    expect(checkEmailUSIU('iabdalla@google.com')).toBe("Invalid email!");
}); 

//check if password is at least 8 characters (3 tests)
test('checkPassword: 1234 is less than 8 characters long', () => {
    expect(checkPassword('1234')).toBe("Wrong!");
});
test('checkPassword: 12345678 is 8 characters long', () => {
    expect(checkPassword('12345678')).toBe("Right!");
}); 
test('checkPassword: 123456789 is more than 8 characters long', () => {
    expect(checkPassword('123456789')).toBe("Right!");
}); 

//check if room is a valid number
test('checkRoom: 99 is not a valid room', () => {
    expect(checkRoom(99)).toBe("Wrong!");
});
test('checkRoom: 999 is not a valid room', () => {
    expect(checkRoom(999)).toBe("Wrong!");
});
test('checkRoom: 801 is a valid room', () => {
    expect(checkRoom(801)).toBe("Right!");
});
test('checkRoom: 8010 is not a valid room', () => {
    expect(checkRoom(8010)).toBe("Wrong!");
});

//check if name exists (2 tests)
test('checkNameExists: eadwera does not exist', () => {
    expect(checkNameExists('eadwera')).toBe("Name doesn't exist!");
});
test('checkNameExists: nsalim does exist', () => {
    expect(checkNameExists('nsalim')).toBe("Name already exists!");
});  
