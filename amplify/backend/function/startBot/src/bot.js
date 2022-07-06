const chromeLambda = require("chrome-aws-lambda");

const insideTrack = 'https://insidetrack.oci.yu.edu/';

exports.handler = async (event) => {

    const browser = await chromeLambda.puppeteer.launch({
        args: chromeLambda.args,
        defaultViewport: chromeLambda.defaultViewport,
        executablePath: await chromeLambda.executablePath
    });

    const page = await browser.newPage();
    await page.goto(insideTrack);
    await page.type('#username', 'sshulma5@mail.yu.edu');
    await page.type('#password', 's7094');

    const  [response] = await Promise.all([
        page.waitForNavigation(),
        page.click('[type="submit"]')
    ]);

    await page.click('#layout_34');
    await page.goto('https://insidetrack.oci.yu.edu/web/home-community/undergraduate');
    await page.goto('https://banner.oci.yu.edu/ssomanager/c/SSB?pkg=twbkwbis.P_GenMenu?name=bmenu.P_MainMnu');
    await page.click('a.submenulinktext2 ');
    await page.goto('https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu');
    await page.goto('https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu');

    console.time("You registered in");

    await page.goto('https://banner.oci.yu.edu/ssb/bwskfreg.P_AltPin');
    await page.click('#term_id');

    await page.select("select#term_id","202209");
    await page.click('#term_id');

    const  [aresponse] = await Promise.all([
        page.waitForNavigation(),
        page.click('[value="Submit"]')
    ]);

    await page.type('#crn_id1', '444444');

    // try {
    //     await page.type('#crn_id2', crn2);
    //     await page.type('#crn_id3', crn3);
    //     await page.type('#crn_id4', crn4);
    //     await page.type('#crn_id5', crn5);
    //     await page.type('#crn_id6', crn6);
    //     await page.type('#crn_id7', crn7);
    //     await page.type('#crn_id8', crn8);
    //     await page.type('#crn_id9', crn9);
    //     await page.type('#crn_id10', crn10);
    // } catch (error) {
    //     await page.keyboard.press('Enter');
    // }
    await page.type('#crn_id2', '6668686');
    await page.keyboard.press('Enter');

    console.timeEnd("You registered in");

    await page.waitForNavigation();
    await page.screenshot({path: './registration-status.png'});
    await browser.close();


};