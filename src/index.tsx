import { App, Route, Response, useRoute, serve } from "react-serve-js";

// Mock data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

function Backend() {
  return (
    <App port={6969}>
      <Route path="/" method="GET">
        {async () => {
          return <Response json={{ message: "Welcome to ReactServe!" }} />;
        }}
      </Route>

      <Route path="/users" method="GET">
        {async () => {
          return <Response json={mockUsers} />;
        }}
      </Route>

      <Route path="/users/:id" method="GET">
        {async () => {
          const { params } = useRoute();
          const user = mockUsers.find((u) => u.id === Number(params.id));
          return user ? (
            <Response json={user} />
          ) : (
            <Response status={404} json={{ error: "User not found" }} />
          );
        }}
      </Route>

      <Route path="/health" method="GET">
        {async () => {
          return (
            <Response
              json={{ status: "OK", timestamp: new Date().toISOString() }}
            />
          );
        }}
      </Route>
    </App>
  );
}

// Start the server
serve(Backend());
