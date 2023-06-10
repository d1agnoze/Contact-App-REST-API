const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@des get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
//@des get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});
//@des create new contacts
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(phone);
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("pls Fill out all Fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });
  res.status(201).json(contact);
});
//@des Update new contacts
//@route PUT /api/contacts
//@access private
const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if(contact.user_id.toString()!== req.user.id){
    res.status(403)
    throw new Error("User dont have the permission to update this contact")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
//@des delete contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if(contact.user_id.toString()!== req.user.id){
    res.status(403)
    throw new Error("User dont have the permission to update this contact")
  }
  await Contact.deleteOne({ _id: req.params.id });
  // Contact.remove();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContacts,
  deleteContacts,
};
