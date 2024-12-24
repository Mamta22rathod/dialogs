// by default dialogs are auto dismissed by plywright,so we dont have to handle them, however we can register a dialog handler before the action that triggers the dialog to either dialog.accept()/dialog.dismiss()
 //import {test, expect} from '@playwright/test';
 const {test, expect} = require('@playwright/test');
 test.skip('Alert with OK', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
   
    //alert popup
    page.on('dialog', async dialog =>{
    await expect(dialog.type).toContain('alert');
    await expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();
    
    })

    await page.click('//button[text() = "Alert"]');
    await page.waitForTimeout(5000);
})

// test('Confirmation dialog-alert with OK & cancel', async ({page}) => {
//     await page.goto('https://testautomationpractice.blogspot.com/');
   
//     //confirmation
//     page.on('dialog', async dialog =>{
//     await expect(dialog.type).toContain('Confirm');
//     await expect(dialog.message()).toContain('Press a button!');
//     await dialog.accept(); // close by using ok button
//     //await dialog.dismiss(); //close by using cancel button

    
//     })

//     await page.click('//button[text()="Confirm Box"]');
//     await expect(page.locator('//p[@id="demo"]')).toHaveText('You pressed OK!');
//     await page.waitForTimeout(5000);
// })

test('Prompt Dialog', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
   
    //confirmation
    page.on('dialog', async dialog =>{
    expect(dialog.type()).toContain('prompt');
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toContain('Harry Potter')
    await dialog.accept('John'); // close by using ok button
    //await dialog.dismiss(); //close by using cancel button

    
    })

    await page.click('//button[text()="Prompt"]');
    await expect(page.locator('//p[@id="demo"]')).toHaveText('Hello John! How are you today?');
    await page.waitForTimeout(5000);
})