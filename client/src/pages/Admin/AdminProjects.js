import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, message } from 'antd';
import { ShowLoading, HideLoading, ReloadData } from '../../redux/rootSlice';
import axios from 'axios';

function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            const tempTechnologies = values?.technologies?.split(' , ') || [];
            values.technologies = tempTechnologies;
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("/api/portfolio/add-project", values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                // Dispatch ReloadData to refresh projects after an update
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/delete-project", {
                _id: item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                // Dispatch ReloadData to refresh projects after deletion
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
                <button className='bg-primary text-white py-2 px-8 rounded-md'
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        setShowAddEditModal(true);
                        setType("add");
                    }}
                >Add Projects</button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
                {projects.map((project) => (
                    <div className='shadow border p-5 border-gray-400 flex flex-col gap-5' key={project._id}>
                        <h1 className='text-orange text-2xl font-bold'>{project.title}</h1>
                        <hr />
                        <img src={project.image} alt="" className="h-60 w-80" />
                        <h1>Role: {project.title}</h1>
                        <h1>JD: {project.description}</h1>
                        <div className='flex gap-5 mt-6'>
                            <button className='bg-primary text-white py-2 px-8 rounded-md'
                                onClick={() => {
                                    setSelectedItemForEdit(project);
                                    setShowAddEditModal(true);
                                    setType("edit");
                                }}>
                                Edit
                            </button>
                            <button className='bg-black text-white px-8 py-2 rounded-md'
                                onClick={() => {
                                    onDelete(project);
                                }}
                            >Delete</button>
                        </div>
                    </div>
                ))}

                {(type === "add" || selectedItemForEdit) && (
                    <Modal
                        visible={showAddEditModal}
                        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
                        footer={null}
                        onCancel={() => {
                            setShowAddEditModal(false);
                            setSelectedItemForEdit(null);
                        }}
                    >
                        <Form
                            layout='vertical'
                            onFinish={onFinish}
                            initialValues={{
                                ...selectedItemForEdit,
                                technologies: selectedItemForEdit?.technologies.join(" , "),
                            }}
                        >
                            <Form.Item name='title' label='Title'>
                                <input placeholder='Title' />
                            </Form.Item>
                            <Form.Item name='image' label='Image'>
                                <input placeholder='Image' />
                            </Form.Item>
                            <Form.Item name='description' label='Description'>
                                <textarea placeholder='Description' />
                            </Form.Item>
                            <Form.Item name='link' label='Link'>
                                <input placeholder='Link' />
                            </Form.Item>
                            <Form.Item name='technologies' label='Technologies'>
                                <input placeholder='Technologies' />
                            </Form.Item>
                            <div className='flex'>
                                <button
                                    className='border-primary text-primary py-2 px-2'
                                    onClick={() => {
                                        setShowAddEditModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
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

export default AdminProjects;
