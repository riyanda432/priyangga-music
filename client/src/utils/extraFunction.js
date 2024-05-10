export const notify = (toast, title, status, description) => {
    return toast({
      title,
      status,
      description,
      duration: 1000,
      position: "top",
      isClosable: true,
    });
  };
  