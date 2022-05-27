// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from 'yup';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// function CreatePost() {
//     let history = useNavigate();

//     const initialValues = {
//         title: "",
//         text: "",
//         userId: "",
//     };

//     const validationSchema = Yup.object().shape({
//         title: Yup.string().required("Champ vide!"),
//         text: Yup.string().required("Champ vide!"),
//         userId: Yup.string().min(3).max(15).required(),
//     });

//     const onSubmit = (data) => {
//         axios.post("http://localhost:3001/post", data).then((response) => {
//             history("/");
//         });
//     };

//     return (
//         <div className="createPostPage">
//             <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
//                 <Form className="formContainer">
//                     <label>Titre: </label>
//                     <ErrorMessage name="title" component="span" />
//                     <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="(ex : John)" />
//                     <label>Post: </label>
//                     <ErrorMessage name="text" component="span" />
//                     <Field autoComplete="off" id="inputCreatePost" name="text" placeholder="(ex : Post...)" />
//                     <label>Username: </label>
//                     <ErrorMessage name="userId" component="span" />
//                     <Field autoComplete="off" id="inputCreatePost" name="userId" placeholder="(ex : John123)" />

//                     <button type="submit"> Créer un Post</button>
//                 </Form>
//             </Formik>
//         </div>
//     );
// }

// export default CreatePost;


// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// function CreatePost() {
//   const initialValues = {
//     title: "",
//     text: "",
//     userId: "",
//   };

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required("You must input a Title!"),
//     text: Yup.string().required(),
//   });

//   const onSubmit = (data) => {
//     axios.post("http://localhost:3001/post", data).then((response) => {
//       console.log("IT WORKED");
//     });
//   };
//   return (
//     <div className="createPostPage">
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className="formContainer">
//           <label>Title: </label>
//           <ErrorMessage name="title" component="span" />
//           <Field
//             autoComplete="off"
//             id="inputCreatePost"
//             name="title"
//             placeholder="(Ex. Title...)"
//           />
//           <label>Post: </label>
//           <ErrorMessage name="text" component="span" />
//           <Field
//             autoComplete="off"
//             id="inputCreatePost"
//             name="text"
//             placeholder="(Ex. Post...)"
//           />
//           <label>Email: </label>
//           <ErrorMessage name="email" component="span" />
//           <Field
//             autoComplete="off"
//             id="inputCreatePost"
//             name="email"
//             placeholder="(Ex. John123...)"
//           />

//           <button type="submit"> Create Post</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default CreatePost;