const {app,BrowserWindow,dialog}=require('electron')
const url=require('url')
const path=require('path')
const { ipcMain } = require('electron')
let fs = require('fs')


let win;

function createWindow(){
  win=new BrowserWindow({
    width:900,
    height:700
  })

  win.loadURL(url.format({
    pathname:path.join(__dirname,'index.html'),
    protocol:'file:',
    slashes:true
  }))

  win.openDevTools()
}

  ipcMain.on('ondragstart', (event, filePath) => {
    
    readFile(filePath);

    function readFile(filepath) { 
      fs.readFile(filepath, 'utf-8', (err, data) => { 
         
         if(err){ 
            alert("An error ocurred reading the file :" + err.message) 
            return 
         } 
         
         // handle the file content 
         event.sender.send('fileData', data) 
      }) 
   } 

  })

  ipcMain.on('clickedbutton', (event, data) => {
    
      dialog.showSaveDialog({ filters: [

        { name: 'text', extensions: ['txt'] }
     
       ]},function (fileName) {

        if(fileName=== undefined) return
        fs.writeFile(fileName, data, function (err) {

        })

      }); 

  })
app.on('ready',createWindow)