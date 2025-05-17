// Simulated in-memory "database"
const EMPLOYEE_TABLE = {};

const empidInput = document.getElementById('empid');
const empnameInput = document.getElementById('empname');
const empsalInput = document.getElementById('empsal');
const hraInput = document.getElementById('hra');
const daInput = document.getElementById('da');
const deductInput = document.getElementById('deduct');

const saveBtn = document.getElementById('save');
const changeBtn = document.getElementById('change');
const resetBtn = document.getElementById('reset');

function setFieldsEnabled(enabled) {
  empnameInput.disabled = !enabled;
  empsalInput.disabled = !enabled;
  hraInput.disabled = !enabled;
  daInput.disabled = !enabled;
  deductInput.disabled = !enabled;
}

function clearForm() {
  empidInput.value = '';
  empnameInput.value = '';
  empsalInput.value = '';
  hraInput.value = '';
  daInput.value = '';
  deductInput.value = '';
}

function isFormValid() {
  return (
    empnameInput.value.trim() !== '' &&
    empsalInput.value.trim() !== '' &&
    hraInput.value.trim() !== '' &&
    daInput.value.trim() !== '' &&
    deductInput.value.trim() !== ''
  );
}

function initialState() {
  clearForm();
  empidInput.disabled = false;
  empidInput.focus();

  setFieldsEnabled(false);

  saveBtn.disabled = true;
  changeBtn.disabled = true;
  resetBtn.disabled = true;
}

// Called when empid input changes (onchange event)
function getEmp() {
  const empid = empidInput.value.trim();
  if (empid === '') {
    alert('Please enter Roll-No.');
    empidInput.focus();
    return;
  }

  if (EMPLOYEE_TABLE.hasOwnProperty(empid)) {
    // Employee exists - load data for update
    const emp = EMPLOYEE_TABLE[empid];
    empnameInput.value = emp.empname;
    empsalInput.value = emp.empsal;
    hraInput.value = emp.hra;
    daInput.value = emp.da;
    deductInput.value = emp.deduct;

    empidInput.disabled = true;
    setFieldsEnabled(true);

    saveBtn.disabled = true;
    changeBtn.disabled = false;
    resetBtn.disabled = false;

    empnameInput.focus();
  } else {
    // New employee - allow save
    setFieldsEnabled(true);
    empnameInput.value = '';
    empsalInput.value = '';
    hraInput.value = '';
    daInput.value = '';
    deductInput.value = '';

    saveBtn.disabled = false;
    changeBtn.disabled = true;
    resetBtn.disabled = false;

    empnameInput.focus();
  }
}

function saveData() {
  if (!isFormValid()) {
    alert('Please fill all fields before saving.');
    return;
  }
  const empid = empidInput.value.trim();
  if (EMPLOYEE_TABLE.hasOwnProperty(empid)) {
    alert('Student already exists.');
    return;
  }

  EMPLOYEE_TABLE[empid] = {
    empname: empnameInput.value.trim(),
    empsal: empsalInput.value.trim(),
    hra: hraInput.value.trim(),
    da: daInput.value.trim(),
    deduct: deductInput.value.trim(),
  };

  alert('Student saved successfully.');

  empidInput.disabled = true;
  saveBtn.disabled = true;
  changeBtn.disabled = false;
  resetBtn.disabled = false;
}

function changeData() {
  if (!isFormValid()) {
    alert('Please fill all fields before updating.');
    return;
  }
  const empid = empidInput.value.trim();
  if (!EMPLOYEE_TABLE.hasOwnProperty(empid)) {
    alert('Student does not exist to update.');
    return;
  }

  EMPLOYEE_TABLE[empid] = {
    empname: empnameInput.value.trim(),
    empsal: empsalInput.value.trim(),
    hra: hraInput.value.trim(),
    da: daInput.value.trim(),
    deduct: deductInput.value.trim(),
  };

  alert('Student updated successfully.');
}

function resetForm() {
  initialState();
}

// Initialize on page load
window.onload = () => {
  initialState();
};
