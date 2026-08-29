import content from "@/data/content-render.json";
import BaselineArticle from "../../components/BaselineArticle";
export default async function BaselineRoute({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const sourcePath=`/${slug.join("/")}/`;const item=content.find((x)=>x.source_path===sourcePath);return <BaselineArticle item={item ?? {...content[0],title:"Không tìm thấy bản ghi",h1:["Không tìm thấy bản ghi"],description:`Không có record cho ${sourcePath}`,body_text:"Hãy quay lại Tàng thư để chọn một bản ghi đã được capture.",headings:[],hero:null}}/>}
