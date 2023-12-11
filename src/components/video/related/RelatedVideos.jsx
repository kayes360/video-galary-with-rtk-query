import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";
import PlayerLoader from "../../ui/loaders/PlayerLoader";
import DescriptionLoader from "../../ui/loaders/DescriptionLoader";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";

export default function RelatedVideos({ title, videoId }) {
  //localhost/videos?title_like=css&tags_like

  const tags = title.split(" ");

  const generatedQueryString = tags
    .map((tag) => `title_like=${tag.toLowerCase()}`)
    .join("&");

  const generatedQueryStringIdExcluded = generatedQueryString.concat(
    `&id_ne=${videoId}`
  );

  //console.log(generatedQueryStringIdExcluded)

  const {
    data: relatedVideos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery(generatedQueryStringIdExcluded);

  //decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && relatedVideos?.length === 0 ) {
    content = <Error message="No related videos found!" />;

  }
  if (!isLoading && !isError && relatedVideos?.length > 0 ) {
    content =  relatedVideos.map((relatedVideo) => (
      <RelatedVideo key={relatedVideo.id} relatedVideo={relatedVideo}/>
       
    ) )
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
