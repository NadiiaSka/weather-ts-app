import { Button } from "@/components/ui/button";

function App() {
  return (
    <div>
      <h1 className="text-7xl font-bold mb-10">App</h1>
      <Button
        variant="destructive"
        size="lg"
        onClick={() => console.log("it worked!!!")}
      >
        Click Me
      </Button>
    </div>
  );
}
export default App;
