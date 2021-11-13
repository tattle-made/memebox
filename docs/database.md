npx sequelize-cli model:generate --name user --attributes username:STRING,password:STRING,role:ENUM:'{author,editor,admin}'

npx sequelize-cli model:generate --name meme --attributes url:string,platform:string,content_type:string,preview:string,store_url:string,title:string

npx sequelize-cli model:generate --name collection --attributes name:string,creator:UUID,description:string

npx sequelize-cli model:generate --name annotationForm --attributes collection:UUID,order:INTEGER,type:enum:{'text,date,radio,range'},label:string

npx sequelize-cli model:generate --name annotations --attributes meme:UUID,collection:UUID,key:string,value:string,user:UUID,type:enum:'{text,date,radio,range}'