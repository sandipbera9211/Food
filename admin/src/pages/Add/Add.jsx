import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios'
  import { ToastContainer, toast } from 'react-toastify';

const Add = ({url}) => {
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setdata(data => ({
      ...data,
      [name]: value
    }));
  };

  const onSubmitHandeler = async (event) => {
  event.preventDefault();

  if (!data.name.trim() || !data.description.trim() || !data.price || !image) {
    alert("Please fill all required fields.");
    return;
  }

  const formData = new FormData(); // ✅ lowercase `formData` is good
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', Number(data.price));
  formData.append('category', data.category);
  formData.append('image', image);

  try {
    const response = await axios.post("http://localhost:4000/api/food/add", formData);

    if (response.data.success) {
      setdata({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      });
      setimage(false);
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Server error. Try again later.");
  }
};

  return (
    <div className=''>
      <form className='flex-col !p-15'onSubmit={onSubmitHandeler}>
        <div className='imag-upload '>
            <p className='text-xl font-semibold  font-serif !mb-2'>Upload the Image</p>
            <label htmlFor="image">
                <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" className='border border-orange-500 border-dotted'/>

            </label>
            <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className='add-name !mt-7 '>
          <p className='font-semibold !mb-2 font-serif '>Product Name</p>
          <input onChange={onChangeHandeler} value={data.name}  type="text" name='name' placeholder='Product' className='border border-orange-500 !px-3 !py-2 w-[450px]'/>
        </div>
        <div className='!mt-7'>
            <p className='font-semibold !mb-2 font-serif'>Product Description</p>
            <textarea onChange={onChangeHandeler} value={data.description} name="description" id="" placeholder='Write about Product' rows="6" className='border border-orange-500 w-[500px]'></textarea>
        </div>
        <div className='flex gap-19 !mt-7'>
            <div>
                <p className='font-semibold !mb-2 font-serif'>Product Category</p>
                <select onChange={onChangeHandeler} value={data.category} name="category" id="" className='border border-orange-500 !px-3 !py-2'>
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
<p className='font-semibold !mb-2 font-serif'> Product Price</p>
<input type="number"  name='price' placeholder='$19' className='border border-orange-500 !px-3 !py-2' onChange={onChangeHandeler} value={data.price}/>
            </div>
        </div>
        <button className='add-button !mt-7 bg-amber-500 text-white !px-4 !py-2 hover:bg-amber-300 hover:cursor-pointer font-semibold font-serif'>ADD Product</button>
      </form>
    </div>
  )
}

export default Add
