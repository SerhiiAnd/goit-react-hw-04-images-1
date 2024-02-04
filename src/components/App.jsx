// import React, { Component } from 'react';
// import axios from 'axios';
// import css from 'components/App.module.css';
// import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import { Loader } from './Loader/Loader';
// import Modal from './Modal/Modal';

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       apiKey: '40631901-ff7c1609fa7e5ab5e54020e9b',
//       query: '',
//       images: [],
//       loading: false,
//       page: 1,
//       largeImageURL: '',
//       showModal: false,
//     };
//   }

//   fetchData = async () => {
//     const { page, apiKey } = this.state;
//     const { query } = this.state;

//     try {
//       this.setState({ loading: true });
//       const response = await axios.get(
//         `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
//       );
//       this.setState(prevState => ({
//         images: [...prevState.images, ...response.data.hits],
//       }));
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   componentDidMount() {
//     if (this.state.query) {
//       this.fetchData();
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.fetchData();
//     }
//   }

//   handleSearchSubmit = newQuery => {
//     this.setState({ query: newQuery, images: [], page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleImageClick = imageURL => {
//     this.setState({ largeImageURL: imageURL, showModal: true });
//   };

//   handleCloseModal = () => {
//     this.setState({ showModal: false, largeImageURL: '' });
//   };

//   render() {
//     const { images, loading, showModal, largeImageURL } = this.state;

//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={this.handleSearchSubmit} />
//         {images.length > 0 && (
//           <ImageGallery images={images} onImageClick={this.handleImageClick} />
//         )}
//         {loading && <Loader />}
//         {images.length > 0 && !loading && (
//           <Button onClick={this.handleLoadMore}>Load more</Button>
//         )}
//         {showModal && (
//           <Modal
//             largeImageURL={largeImageURL}
//             onClose={this.handleCloseModal}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import css from 'components/App.module.css';
const App = () => {
  const apiKey = '40631901-ff7c1609fa7e5ab5e54020e9b';
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages(prevImages => [...prevImages, ...response.data.hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page, apiKey]);
  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const handleImageClick = imageURL => {
    setLargeImageURL(imageURL);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };
  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
    </div>
  );
};
export default App;
