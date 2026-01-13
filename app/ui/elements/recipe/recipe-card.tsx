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
import { Recipe } from "@/app/lib/definitions";
import Link from "next/link";
import { UrlUtils } from "@/app/lib/urlUtils";

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const urlFriendlyTitle = UrlUtils.getUrlFriendlyLabel(recipe.title);
  return (
    <Card
      sx={{ maxWidth: 288, width: "100%" }}
      className="ml-2 mr-2 recipe-card"
    >
      <Link href={`/recipes/${recipe.id}/${urlFriendlyTitle}`}>
        <CardActionArea component="div">
          <CardMedia
            sx={{ height: 140 }}
            image={recipe.image}
            title="green iguana"
          />
          <CardContent>
            <Typography variant="h6" component="div" padding="0">
              {recipe.title}
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
                value={recipe.rate}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="info-item">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <FontAwesomeIcon className="icon" icon={faClock} />
                {recipe.time} min
              </Typography>
            </div>

            <div className="info-item">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <FontAwesomeIcon className="icon" icon={faUser} />
                {recipe.portions}
              </Typography>
            </div>
          </Box>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default RecipeCard;
