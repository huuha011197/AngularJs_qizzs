import * as fs from 'fs';
fs.writeFile('foo/some-file.txt', 'foo')
  .then(function(){
    return fs.readdir('foo');
  })
  .then(function(files){
    files // -> [ {some-file.txt} ]
  });