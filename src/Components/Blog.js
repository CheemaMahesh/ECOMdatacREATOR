// Blogging App with Firebase
import { useState, useRef, useEffect } from "react";
import { db } from "../firebaseInit";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

export default function Blog() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    color: "",
    category: "",
    price: "",
    segment: "",
    brand: "",
    stars: "", // New field for stars
    details: "", // New field for details
  });

  const [blogs, setBlogs] = useState([]);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    const sub = onSnapshot(collection(db, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setBlogs(blogs);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    titleRef.current.focus();
    const docRef = doc(collection(db, "blogs"));
    await setDoc(docRef, {
      title: formData.title,
      url: formData.url,
      color: formData.color,
      category: formData.category,
      price: formData.price,
      segment: formData.segment,
      brand: formData.brand,
      stars: formData.stars, // Save "stars" in Firestore
      details: formData.details, // Save "details" in Firestore
      createdOn: new Date(),
    });
    setFormData({
      title: "",
      url: "",
      color: "",
      category: "",
      price: "",
      segment: "",
      brand: "",
      stars: "",
      details: "",
    });
  }

  async function removeBlog(i) {
    const docRef = doc(db, "blogs", i);
    deleteDoc(docRef);
  }

  return (
    <>
      <h1>Write a Blog!</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              ref={titleRef}
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </Row>

          <Row label="Url">
            <input
              className="input"
              placeholder="Content of the Blog goes here.."
              required
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  url: e.target.value,
                })
              }
            />
          </Row>
          <Row label="Color">
            <input
              className="input"
              placeholder="Content of the Blog goes here.."
              required
              value={formData.color}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  color: e.target.value,
                })
              }
            />
          </Row>
          <Row label="Category">
            <input
              className="input"
              placeholder="Content of the Blog goes here.."
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            />
          </Row>
          <Row label="Price">
            <input
              className="input"
              placeholder="Content of the Blog goes here.."
              type="number"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
            />
          </Row>
          <Row label="Segment">
            <input
              className="input"
              placeholder="Content of the Blog goes here.."
              required
              value={formData.segment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  segment: e.target.value,
                })
              }
            />
          </Row>
          <Row label="Brand">
            <input
              className="input"
              placeholder="Content of the Blog goes here.."
              type="text"
              required
              value={formData.brand}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brand: e.target.value,
                })
              }
            />
          </Row>
          {/* New input field for "stars" */}
          <Row label="Stars">
            <input
              className="input"
              placeholder="Enter the number of stars..."
              type="number"
              required
              value={formData.stars}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stars: e.target.value,
                })
              }
            />
          </Row>
          {/* New input field for "details" */}
          <Row label="Details">
            <textarea
              className="input"
              placeholder="Enter the details..."
              value={formData.details}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: e.target.value,
                })
              }
            />
          </Row>
          <button className="btn">ADD</button>
        </form>
      </div>
      <hr />
      <h2> Blogs </h2>
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>
            {blog.title} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{i}
          </h3>
          <hr />
          <img src={blog.url} className="mahesh" />
          <hr />
          <p>Color-{blog.color}</p>
          <hr />
          <p>{blog.category}</p>
          <hr />
          <p>&#8377; {blog.price}</p>
          <hr />
          <p> for {blog.segment}</p>
          <hr />
          <p className="maheshh">{blog.brand}</p>
          <p>Stars: {blog.stars}</p> {/* Display "stars" field */}
          <hr />
          <p>Details: {blog.details}</p> {/* Display "details" field */}
          <div className="blog-btn">
            <button
              onClick={() => {
                removeBlog(blog.id);
              }}
              className="btn remove"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function Row(props) {
  const { label } = props;
  return (
    <>
      <label>{label}<br /></label>
      {props.children}
      <hr />
    </>
  );
}
