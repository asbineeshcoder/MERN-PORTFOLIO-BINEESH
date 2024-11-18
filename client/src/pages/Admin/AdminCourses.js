import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, message } from 'antd';
import { ShowLoading, HideLoading, ReloadData } from '../../redux/rootSlice';
import axios from 'axios';
import Item from 'antd/es/list/Item';

//import {message} from 'antd';

function AdminCourses() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemforedit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading())
            let response
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-course", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });

            } else {
                response = await axios.post("/api/portfolio/add-course", values);
            }

            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemforedit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message)
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (Item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/delete-course", {
                _id: Item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary text-white py-2 px-8  rounded-md'
                    onClick={() => {
                        setSelectedItemforedit(null);
                        setShowAddEditModal(true);
                    }}
                >Add courses</button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
                {courses.map((course) => (
                    <div className='shadow border p-5 border-gray-400  flex flex-col gap-2'>
                        <h1 className='text-orange text-2xl font-bold'>{course.title}</h1>
                        <hr />
                        <h1>JD: {course.description}</h1>
                        <div className='flex gap-5 mt-6'>
                            <button className='bg-primary text-white py-2 px-8  rounded-md'
                                onClick={() => {
                                    setSelectedItemforedit(course);
                                    setShowAddEditModal(true);
                                    setType("edit");
                                }}>
                                Edit</button>
                            <button className='bg-black text-white px-8 py-2  rounded-md'
                                onClick={() => {
                                    onDelete(course);
                                }}
                            >Delete</button>
                        </div>
                    </div>

                ))}


                {(type === "add" || selectedItemForEdit) && (


                    <Modal
                        visible={showAddEditModal}
                        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
                        footer={null}
                        onCancel={() => {
                            setShowAddEditModal(false);
                            setSelectedItemforedit(null);
                        }}
                    >
                        <Form layout='vertical' onFinish={onFinish}
                            initialValues={selectedItemForEdit || {}}>
                            <Form.Item name='title' label='Title'>
                                <input placeholder='Title' />
                                <Form.Item name='image' label='Image'>
                                    <input placeholder='Image' />
                                </Form.Item>
                                <Form.Item name='link' label='Link'>
                                    <input placeholder='Link' />
                                </Form.Item>

                            </Form.Item>
                            <Form.Item name='description' label='Description'>
                                <input placeholder='Description' />
                            </Form.Item>
                            <Form.Item name='technologies' label='Technologies'>
                                <input placeholder='Technologies' />
                            </Form.Item>
                            <div className='flex'>
                                <button className='border-primary text-primary py-2 px-2'
                                    onClick={() => {
                                        setShowAddEditModal(false);
                                    }}
                                >
                                    Cancel</button>
                                <button className='bg-primary text-white py-2 px-2'>
                                    {selectedItemForEdit ? "Update" : "Add"}
                                </button>
                            </div>
                        </Form>
                    </Modal>

                )}
            </div>
        </div>
    );
}

export default AdminCourses;
