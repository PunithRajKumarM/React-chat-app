export const googleLoginHandler = async (e, data) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${e}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const getMessagesHandler = async (e) => {
  let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${e}`);
  return response;
};
