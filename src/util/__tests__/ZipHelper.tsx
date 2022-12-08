import JSZip from "jszip";
import {Zip} from "../ZipHelper";

it("Get Zip Files", () => {

    const zip = new JSZip();

    zip.file("test.txt", "Hello World");

    zip.generateAsync({ type: "blob" }).then((content) => {
        
            let file = new File([content], "test.zip");
        
            const zipHelper = new Zip(file);
        
            zipHelper.getFiles().then((files) => {
        
                expect(files.length).toBe(1);
        
                expect(files[0].name).toBe("test.txt");
        
                files[0].async("string").then((content) => {
        
                    expect(content).toBe("Hello World");
        
                });
        
            });

    });

    
});