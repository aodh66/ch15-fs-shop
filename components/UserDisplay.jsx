import Image from "next/image";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
} from "@/components/mui";

const UserDisplay = ({ user }) => {
  const { nickname, name, picture, email, sub } = user;

  return (
    <>
      <Card>
        <CardMedia sx={{ display: "grid", placeContent: "center" }}>
          <Image
            alt={nickname}
            src={picture}
            width="200"
            height="200"
            style={{ borderRadius: "50%" }}
          />
        </CardMedia>
        <CardContent>
          <List
            component="dl"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1em",
            }}
          >
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Name
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Email
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {email}
            </Typography>
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Sub
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {sub}
            </Typography>
          </List>
        </CardContent>
      </Card>
      <hr />
      <Typography component="dd" sx={{ fontWeight: "bold" }}>Your Data</Typography>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default UserDisplay;
