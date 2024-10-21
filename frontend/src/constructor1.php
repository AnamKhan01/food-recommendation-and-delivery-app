<?php
// Base Class
class Person 
{
    protected $name;
    protected $age;
    
    // Constructor
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function display() {
        echo "Name: " . $this->name . "<br>";
        echo "Age: " . $this->age . "<br>";
    }
}

// Derived Class
class Student extends Person {
    private $studentId;

    // Constructor
    public function __construct($name, $age, $studentId) {
        // Call the parent constructor
        parent::__construct($name, $age);
        $this->studentId = $studentId;
    }

    public function display() {
        parent::display();
        echo "Student ID: " . $this->studentId . "<br>";
    }
}

// Create an instance of the Student class
$student = new Student("Vivek", 21, "S1234");
$student1 = new Student("Naman", 20, "S2234");
$student2 = new Student("Pratham", 22, "S2034");
$student->display();
$student1->display();
$student2->display();
?>
