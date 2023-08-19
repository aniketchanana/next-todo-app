import { Button } from "@/components/common/Button";
import { mainRoutes } from "@/constants/routes";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

const NotFoundPage: FC = () => {
  const router = useRouter();
  return (
    <Box
      h="full"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={8}
    >
      <Image
        alt="Not found image"
        src={"/notFound.svg"}
        width={600}
        height={600}
      />
      <Button onClick={() => router.push(mainRoutes.root())}>
        Go to home page
      </Button>
    </Box>
  );
};

export default NotFoundPage;
