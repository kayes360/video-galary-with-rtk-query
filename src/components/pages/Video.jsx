import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import Error from "../ui/Error";

export default function Video() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError  } = useGetVideoQuery(videoId, {
    refetchOnMountOrArgChange: 5
  });

  //decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && video?.id) {
    content = (
      <>
        <Player title={video.title} link={video.link}/>
        <Description video={video}/>
      </>
    );
  }

  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {video?.id ? (
            <RelatedVideos title={video.title} videoId={video.id}/>
          ) : isLoading ? (
            <>
              <RelatedVideoLoader />
              <RelatedVideoLoader />
              <RelatedVideoLoader />
            </>
          ) : (
            <RelatedVideoLoader />
          )}
        </div>
      </div>
    </section>
  );
}
