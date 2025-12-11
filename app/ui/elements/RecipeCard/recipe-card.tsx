import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import "./recipe-card.scss";

const RecipeCard: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 288, width: "100%" }} className="ml-2 mr-2">
      <CardActionArea>
        <CardMedia
          sx={{ height: 140 }}
          image="/carbonara.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography variant="h6" component="div" padding="0">
            Pasta carbonara
          </Typography>
        </CardContent>
        <Box
          className="pl-4 pr-4 pb-2"
          sx={{
            display: "flex",
          }}
        >
          <div className="info-item">
            <Rating
              size="small"
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </div>
          <div className="info-item">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <FontAwesomeIcon className="icon" icon={faClock} />
              20 min
            </Typography>
          </div>

          <div className="info-item">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <FontAwesomeIcon className="icon" icon={faUser} />4
            </Typography>
          </div>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
