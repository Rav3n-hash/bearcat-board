import axios from "axios";


//var host="https://backend1-ten-rho.vercel.app";
var host="http://localhost:8000"


async function GetPosts(){
    const res = await axios.get(host+"/post/posts",{ headers: {
      'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With"
   }}, { withCredentials: true });
    let list=[];
    res.data.rows.map((tmp,index)=>{
    var post={"post_id":tmp.post_id,"user_id":tmp.user_id,"content":tmp.content,"post_type":tmp.post_type,"organization_id":tmp.organization_id, "pic":tmp.picture, "first_name": tmp.first_name, "last_name":tmp.last_name, "organization_name": tmp.organization_name};
      list.push(post);
     })
     console.log(list);
return list;
}
export {GetPosts}
