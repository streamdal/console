import{r as a}from"./index.03be2d59.js";import{j as e,L as d,E as u,g as x}from"./error.76753ac1.js";import{D as h}from"./crud.c1c507e9.js";const f=async({method:r,apiPath:l,body:s})=>{const t=await fetch(`http://localhost:9191${l}`,{method:r,...s?{body:JSON.stringify(s)}:{}});if(t.ok||t.redirected)return t.json();throw Error("operation failed")},p="Ruleset not found!",j="There was a problem deleting the ruleset!",E=()=>{const[r,l]=a.useState(null),[s,t]=a.useState(!0),[o,i]=a.useState(""),n=new URLSearchParams(document.location.search).get("id"),c=async()=>{try{l(await x(`/v1/ruleset/${n}`))}catch{i(p)}t(!1)},m=async()=>{try{await f({method:"DELETE",apiPath:`/v1/ruleset/${n}`}),window.location.href="/"}catch{i(j)}t(!1)};return a.useEffect(()=>{if(t(!0),!n){t(!1),i("Ruleset ID param is required");return}c()},[]),s?e.jsx(d,{}):o?e.jsx(u,{error:o}):e.jsxs("div",{className:"relative z-10","aria-labelledby":"modal-title",role:"dialog","aria-modal":"true",children:[e.jsx("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"}),e.jsx("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:e.jsx("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:e.jsxs("div",{className:"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",children:[e.jsx("div",{className:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:e.jsxs("div",{className:"sm:flex sm:items-start",children:[e.jsx("div",{className:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",children:e.jsx(h,{fill:"#FF7D68","aria-hidden":"true"})}),e.jsxs("div",{className:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",children:[e.jsx("h3",{className:"text-base font-semibold leading-6 text-gray-900",id:"modal-title",children:"Delete Ruleset"}),e.jsx("div",{className:"mt-2",children:e.jsxs("p",{className:"text-sm text-gray-500",children:["Are you sure you want to delete ruleset"," ",e.jsx("span",{className:"font-bold",children:r?.name}),"?"]})})]})]})}),e.jsxs("div",{className:"px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",children:[e.jsx("button",{type:"button",className:"ml-2 btn-delete",onClick:()=>m(),children:"Delete"}),e.jsx("button",{type:"button",className:"btn-cancel",onClick:()=>window.history.back(),children:"Cancel"})]})]})})})]})};export{E as RuleSetDelete};