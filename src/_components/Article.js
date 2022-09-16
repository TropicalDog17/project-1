import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
export default function Article() {
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
          fugiat culpa eligendi nisi at, eius architecto commodi harum ipsum
          deserunt autem mollitia quis accusamus reiciendis sed! Ut facere ipsum
          vel!
        </Card.Text>
        <Button variant="primary">Xem thêm</Button>
      </Card.Body>
    </Card>
  );
}
