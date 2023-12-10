import Video from "./Video";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";
import { useGetVideosQuery } from "../../features/api/apiSlice";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  //decide what to render
  let content = null;

  if (isLoading) {
    content = <VideoLoader />;
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error"/>;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <Error  message="No video found!"/>;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map(video => <Video key={video.id} video={video}/>);
  }

  return (
    <>
      {content}
    </>
  );
}
