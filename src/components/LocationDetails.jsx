import { useParams } from "react-router-dom";

const LocationDetails = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => {
    return blog.id == id ? blog : null;
  });
  return (
    <>
      <h1>{blog.title}</h1>
      <h5>{blog.date}</h5>
      <p className="blog-body">{blog.body}</p>
      <form data-testid="commentSection">
        <label>
          <textarea data-testid="commentInput" />
        </label>
        <button data-testid="submitCommentButton">Add Comment</button>
      </form>
    </>
  );
};

export default LocationDetails;