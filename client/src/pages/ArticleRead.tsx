import Article from "../components/Article";
import AsideLink from "./AsideLink";

function ArticleRead() {
  return (
    <>
      <div className="mx-auto mt-[42px] flex w-full justify-center gap-0 self-center">
        <AsideLink />
        <Article />
      </div>
    </>
  );
}

export default ArticleRead;
