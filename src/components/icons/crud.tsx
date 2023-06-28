export const Edit = (props: any) => {
  const fillColor = props?.fill || "#372D56";

  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.3353 6.5479C12.1806 6.5479 12.0322 6.60936 11.9228 6.71875C11.8134 6.82815 11.752 6.97652 11.752 7.13123V10.6312C11.752 10.7859 11.6905 10.9343 11.5811 11.0437C11.4717 11.1531 11.3233 11.2146 11.1686 11.2146H3.00195C2.84724 11.2146 2.69887 11.1531 2.58947 11.0437C2.48008 10.9343 2.41862 10.7859 2.41862 10.6312V2.46456C2.41862 2.30985 2.48008 2.16148 2.58947 2.05209C2.69887 1.94269 2.84724 1.88123 3.00195 1.88123H6.50195C6.65666 1.88123 6.80504 1.81977 6.91443 1.71038C7.02383 1.60098 7.08529 1.45261 7.08529 1.2979C7.08529 1.14319 7.02383 0.994815 6.91443 0.885418C6.80504 0.776022 6.65666 0.714564 6.50195 0.714564H3.00195C2.53782 0.714564 2.0927 0.898939 1.76452 1.22713C1.43633 1.55532 1.25195 2.00044 1.25195 2.46456V10.6312C1.25195 11.0954 1.43633 11.5405 1.76452 11.8687C2.0927 12.1969 2.53782 12.3812 3.00195 12.3812H11.1686C11.6327 12.3812 12.0779 12.1969 12.4061 11.8687C12.7342 11.5405 12.9186 11.0954 12.9186 10.6312V7.13123C12.9186 6.97652 12.8572 6.82815 12.7478 6.71875C12.6384 6.60936 12.49 6.5479 12.3353 6.5479ZM3.58529 6.99123V9.46456C3.58529 9.61927 3.64674 9.76765 3.75614 9.87704C3.86554 9.98644 4.01391 10.0479 4.16862 10.0479H6.64195C6.71872 10.0483 6.79483 10.0336 6.8659 10.0046C6.93697 9.97557 7.00161 9.93279 7.05612 9.87873L11.0928 5.83623L12.7495 4.21456C12.8041 4.16034 12.8475 4.09582 12.8771 4.02473C12.9068 3.95365 12.922 3.8774 12.922 3.8004C12.922 3.72339 12.9068 3.64715 12.8771 3.57606C12.8475 3.50498 12.8041 3.44046 12.7495 3.38623L10.2761 0.883731C10.2219 0.829056 10.1574 0.785659 10.0863 0.756044C10.0152 0.726429 9.93896 0.711182 9.86195 0.711182C9.78495 0.711182 9.7087 0.726429 9.63762 0.756044C9.56653 0.785659 9.50201 0.829056 9.44779 0.883731L7.80279 2.53456L3.75445 6.57706C3.70039 6.63157 3.65762 6.69621 3.62859 6.76729C3.59956 6.83836 3.58484 6.91446 3.58529 6.99123ZM9.86195 2.1204L11.5128 3.77123L10.6845 4.59956L9.03362 2.94873L9.86195 2.1204ZM4.75195 7.2304L8.21112 3.77123L9.86195 5.42206L6.40279 8.88123H4.75195V7.2304Z"
        fill={fillColor}
      />
    </svg>
  );
};

export const Delete = (props: any) => {
  const fillColor = props?.fill || "#FF7D68";

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      // fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.79971 4.7998C5.13108 4.7998 5.39971 5.06843 5.39971 5.3998V8.3998C5.39971 8.73118 5.13108 8.9998 4.79971 8.9998C4.46834 8.9998 4.19971 8.73118 4.19971 8.3998V5.3998C4.19971 5.06843 4.46834 4.7998 4.79971 4.7998Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.19949 4.7998C7.53086 4.7998 7.79949 5.06843 7.79949 5.3998V8.3998C7.79949 8.73118 7.53086 8.9998 7.19949 8.9998C6.86812 8.9998 6.59949 8.73118 6.59949 8.3998V5.3998C6.59949 5.06843 6.86812 4.7998 7.19949 4.7998Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.8 0C3.80589 0 3 0.805887 3 1.8H1.2H0.6C0.268629 1.8 0 2.06863 0 2.4C0 2.73137 0.268629 3 0.6 3H1.2V10.2C1.2 11.1941 2.00589 12 3 12H9C9.99411 12 10.8 11.1941 10.8 10.2V3H11.4C11.7314 3 12 2.73137 12 2.4C12 2.06863 11.7314 1.8 11.4 1.8H10.8H9C9 0.805888 8.19411 0 7.2 0H4.8ZM7.8 1.8C7.8 1.46863 7.53137 1.2 7.2 1.2H4.8C4.46863 1.2 4.2 1.46863 4.2 1.8H7.8ZM3 3H2.4V10.2C2.4 10.5314 2.66863 10.8 3 10.8H9C9.33137 10.8 9.6 10.5314 9.6 10.2V3H9H3Z"
        fill={fillColor}
      />
    </svg>
  );
};

export const View = (props: any) => {
  const fillColor = props?.fill || "#372D56";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fillColor}
      className="w-4 h-4 mr-2 text-web"
    >
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path
        fill-rule="evenodd"
        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
        clip-rule="evenodd"
      />
    </svg>
  );
};
