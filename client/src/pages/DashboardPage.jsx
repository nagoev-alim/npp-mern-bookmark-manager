import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
/* =============================
📦 Custom Imports
============================= */
import { userSelector } from '@features/user/userSlice.js';
import { Modal } from '@ui/index.js';
import { API_CATEGORIES } from '@api/api.js';
import { categoriesSelector, resetCategoriesState } from '@features/categories/categoriesSlice.js';
import { CategoryList } from '@features/categories/components/index.js';
import { BookmarkList } from '@features/bookmarks/components/index.js';
/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
   📦 Section - Hooks & Variables:
   ============================= */
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const [toggleModal, setToggleModal] = useState(false);
  const [type, setType] = useState(null);
  const { entries: categories, error, message } = useSelector(categoriesSelector);
  /* =============================
  📦 Section - Methods:
  ============================= */
  const onCreateCategory = (type) => {
    setType(type);
    setToggleModal(true);
  };
  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetCategoriesState());
    }
    dispatch(API_CATEGORIES.GET())
      .then(() => dispatch(resetCategoriesState()));
  }, [dispatch, error, message]);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <div className='grid gap-2 px-3 container mx-auto max-w-6xl sm:gap-4'>
    <h1 className='font-bold text-xl md:text-3xl text-center'>👋 {user.username}, Dashboard</h1>
    {/* Buttons */}
    <div className='grid gap-3 sm:grid-cols-2'>
      <button className='btn btn-primary' onClick={() => onCreateCategory('category')}>
        Add Category
      </button>
      <button className='btn' onClick={() => onCreateCategory('bookmark')}>
        Add Bookmark
      </button>
    </div>
    {/* Modal */}
    <Modal type={type} categories={categories} toggleModal={toggleModal}
           toggleModalWindow={(reset) => {
             setToggleModal(p => !p);
             reset();
           }}
    />
    {/* Lists */}
    <CategoryList />
    <BookmarkList categories={categories} />
  </div>;
}
