import content from "@/data/content-render.json";
import BaselineArticle from "../components/BaselineArticle";
export default function BaselineRoot(){return <BaselineArticle item={content.find((x)=>x.source_path==="/") ?? content[0]}/>}
