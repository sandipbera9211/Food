import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!data.name || !data.description || !data.price || !image) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className=''>
      <form className='flex-col !p-15' onSubmit={onSubmitHandler}>
        <div className='imag-upload'>
          <p className='text-xl font-semibold font-serif !mb-2'>Upload the Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className='border border-orange-500 border-dotted' />
          </label>
          <input type="file" id='image' hidden onChange={(e) => setImage(e.target.files[0])} required />
        </div>

        <div className='add-name !mt-7'>
          <p className='font-semibold !mb-2 font-serif'>Product Name</p>
          <input type="text" name='name' placeholder='Product' className='border border-orange-500 !px-3 !py-2 w-[450px]'
            value={data.name} onChange={onChangeHandler} />
        </div>

        <div className='!mt-7'>
          <p className='font-semibold !mb-2 font-serif'>Product Description</p>
          <textarea name="description" placeholder='Write about Product' rows="6" className='border border-orange-500 w-[500px]'
            value={data.description} onChange={onChangeHandler}></textarea>
        </div>

        <div className='flex gap-19 !mt-7'>
          <div>
            <p className='font-semibold !mb-2 font-serif'>Product Category</p>
            <select name="category" value={data.category} onChange={onChangeHandler} className='border border-orange-500 !px-3 !py-2'>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Noodles">Noodles</option>
              <option value="Pasta">Pasta</option>
            </select>
          </div>

          <div className='add-price'>
            <p className='font-semibold !mb-2 font-serif'>Product Price</p>
            <input type="number" name='price' placeholder='$19' className='border border-orange-500 !px-3 !py-2'
              value={data.price} onChange={onChangeHandler} />
          </div>
        </div>

        <button className='add-button !mt-7 bg-amber-500 text-white !px-4 !py-2 hover:bg-amber-300 hover:cursor-pointer font-semibold font-serif'>
          ADD Product
        </button>
      </form>
    </div>
  )
}

export default Add;
