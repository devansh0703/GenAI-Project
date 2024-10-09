'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
const courseStructure = {
  topics: [
    {
      id: 1,
      title: 'Introduction to C',
      description: 'Provides a review of basic C constructs to familiarize readers with syntax and concepts that will be used to write programs.',
      subtopics: [
        { id: 1, title: 'Basic syntax' },
        { id: 2, title: 'Variables and types' },
        { id: 3, title: 'Input/output in C' },
        { id: 4, title: 'Operators in C' },
        { id: 5, title: 'Control structures' },
        { id: 6, title: 'Functions' },
        { id: 7, title: 'Arrays in C' },
        { id: 8, title: 'Pointers' },
        { id: 9, title: 'Memory management' },
        { id: 10, title: 'File I/O' },
        { id: 11, title: 'Preprocessor directives' },
        { id: 12, title: 'Command-line arguments' },
        { id: 13, title: 'Structures in C' },
        { id: 14, title: 'Union in C' },
        { id: 15, title: 'Bitwise operators' },
        { id: 16, title: 'Dynamic memory allocation' },
        { id: 17, title: 'Recursion basics' },
        { id: 18, title: 'Linking in C' },
        { id: 19, title: 'Debugging in C' },
        { id: 20, title: 'Optimization techniques' }
      ]
    },
    {
      id: 2,
      title: 'Introduction to Data Structures and Algorithms',
      description: 'Introduction to data structures and algorithms, covering time complexity and performance evaluation of algorithms.',
      subtopics: [
        { id: 1, title: 'What is a data structure?' },
        { id: 2, title: 'What is an algorithm?' },
        { id: 3, title: 'Classification of data structures' },
        { id: 4, title: 'Classification of algorithms' },
        { id: 5, title: 'Understanding time complexity' },
        { id: 6, title: 'Big O Notation' },
        { id: 7, title: 'Space complexity' },
        { id: 8, title: 'Importance of data structures in algorithms' },
        { id: 9, title: 'Analyzing performance of algorithms' },
        { id: 10, title: 'Introduction to asymptotic analysis' },
        { id: 11, title: 'Common algorithmic paradigms' },
        { id: 12, title: 'Algorithm efficiency' },
        { id: 13, title: 'Introduction to recursion' },
        { id: 14, title: 'Iterative vs recursive algorithms' },
        { id: 15, title: 'Dynamic programming introduction' },
        { id: 16, title: 'Greedy algorithms' },
        { id: 17, title: 'Divide and conquer technique' },
        { id: 18, title: 'Best, worst, and average case analysis' },
        { id: 19, title: 'NP-completeness introduction' },
        { id: 20, title: 'Real-world applications of algorithms' }
      ]
    },

    {
      id: 3,
      title: 'Arrays',
      description: 'Detailed explanation of one-dimensional, two-dimensional, and multi-dimensional arrays, including operations performed on them.',
      subtopics: [
        { id: 1, title: 'Introduction to arrays' },
        { id: 2, title: 'Declaring and initializing arrays' },
        { id: 3, title: 'Accessing elements in arrays' },
        { id: 4, title: 'Memory layout of arrays' },
        { id: 5, title: 'One-dimensional arrays' },
        { id: 6, title: 'Two-dimensional arrays' },
        { id: 7, title: 'Multi-dimensional arrays' },
        { id: 8, title: 'Inserting elements into arrays' },
        { id: 9, title: 'Deleting elements from arrays' },
        { id: 10, title: 'Searching elements in arrays' },
        { id: 11, title: 'Sorting arrays' },
        { id: 12, title: 'Array traversal' },
        { id: 13, title: 'Dynamic arrays' },
        { id: 14, title: 'Jagged arrays' },
        { id: 15, title: 'Array of pointers' },
        { id: 16, title: 'Memory allocation for arrays' },
        { id: 17, title: 'Applications of arrays' },
        { id: 18, title: 'Common array algorithms' },
        { id: 19, title: 'Time complexity in array operations' },
        { id: 20, title: 'Array manipulation in C' }
      ]
    },
    {
      id: 4,
      title: 'Strings',
      description: 'Introduction to strings (character arrays), including operations such as reading, writing, and manipulating them.',
      subtopics: [
        { id: 1, title: 'Introduction to strings' },
        { id: 2, title: 'Declaring and initializing strings' },
        { id: 3, title: 'String manipulation functions in C' },
        { id: 4, title: 'String comparison' },
        { id: 5, title: 'String concatenation' },
        { id: 6, title: 'Finding string length' },
        { id: 7, title: 'Substring extraction' },
        { id: 8, title: 'String reversal' },
        { id: 9, title: 'String tokenization' },
        { id: 10, title: 'Null-terminated strings' },
        { id: 11, title: 'Character encoding' },
        { id: 12, title: 'String to number conversions' },
        { id: 13, title: 'String searching algorithms' },
        { id: 14, title: 'String sorting algorithms' },
        { id: 15, title: 'Memory management in strings' },
        { id: 16, title: 'Multi-line strings' },
        { id: 17, title: 'String compression techniques' },
        { id: 18, title: 'Common string manipulation algorithms' },
        { id: 19, title: 'Applications of strings' },
        { id: 20, title: 'Time complexity of string operations' }
      ]
    },
    {
      id: 5,
      title: 'Structures and Unions',
      description: 'Covers the use of structures and unions for organizing data of different types, and their applications in advanced data structures.',
      subtopics: [
        { id: 1, title: 'Introduction to structures' },
        { id: 2, title: 'Declaring and initializing structures' },
        { id: 3, title: 'Accessing members of structures' },
        { id: 4, title: 'Arrays of structures' },
        { id: 5, title: 'Nested structures' },
        { id: 6, title: 'Dynamic memory allocation for structures' },
        { id: 7, title: 'Introduction to unions' },
        { id: 8, title: 'Difference between structures and unions' },
        { id: 9, title: 'Applications of structures in linked lists' },
        { id: 10, title: 'Applications of structures in trees' },
        { id: 11, title: 'Applications of structures in graphs' },
        { id: 12, title: 'Memory representation of structures' },
        { id: 13, title: 'Self-referential structures' },
        { id: 14, title: 'Padding and packing in structures' },
        { id: 15, title: 'Function pointers in structures' },
        { id: 16, title: 'Structures as function arguments' },
        { id: 17, title: 'Union applications' },
        { id: 18, title: 'Memory alignment in unions' },
        { id: 19, title: 'Using structures and unions in low-level programming' },
        { id: 20, title: 'Advanced applications of structures' }
      ]
    },
    {
      id: 6,
      title: 'Linked Lists',
      subtopics: [
        { id: 1, title: 'Introduction to linked lists' },
        { id: 2, title: 'Singly linked lists' },
        { id: 3, title: 'Doubly linked lists' },
        { id: 4, title: 'Circular linked lists' },
        { id: 5, title: 'Operations on linked lists' },
        { id: 6, title: 'Dynamic memory allocation in linked lists' },
        { id: 7, title: 'Reversing a linked list' },
        { id: 8, title: 'Merging two linked lists' },
        { id: 9, title: 'Detecting loops in linked lists' },
        { id: 10, title: 'Applications of linked lists' },
        { id: 11, title: 'Linked list vs. Array' },
        { id: 12, title: 'Implementing stacks using linked lists' },
        { id: 13, title: 'Implementing queues using linked lists' },
        { id: 14, title: 'Linked list traversal methods' },
        { id: 15, title: 'Linked list and recursion' },
        { id: 16, title: 'Sorting linked lists' },
        { id: 17, title: 'Using linked lists for polynomial representation' },
        { id: 18, title: 'Flattening a multi-level linked list' },
        { id: 19, title: 'Implementing a multi-linked list' },
        { id: 20, title: 'Header linked lists' }
      ]
    },
    {
      id: 7,
      title: 'Stacks',
      subtopics: [
        { id: 1, title: 'Understanding stacks and LIFO principle' },
        { id: 2, title: 'Array-based implementation of stacks' },
        { id: 3, title: 'Linked list-based implementation of stacks' },
        { id: 4, title: 'Common stack operations' },
        { id: 5, title: 'Applications of stacks' },
        { id: 6, title: 'Stack overflow and underflow' },
        { id: 7, title: 'Evaluating arithmetic expressions using stacks' },
        { id: 8, title: 'Conversion of infix to postfix expressions' },
        { id: 9, title: 'Backtracking algorithms using stacks' },
        { id: 10, title: 'Stack-based memory management' },
        { id: 11, title: 'Implementing recursive functions using stacks' },
        { id: 12, title: 'Parsing expressions using stacks' },
        { id: 13, title: 'Reversing strings using stacks' },
        { id: 14, title: 'Implementing function calls with stacks' },
        { id: 15, title: 'Stack applications in undo mechanisms' },
        { id: 16, title: 'Using stacks for expression evaluation' },
        { id: 17, title: 'Depth-first search algorithm with stacks' },
        { id: 18, title: 'Using stacks for pathfinding algorithms' },
        { id: 19, title: 'Implementing a browser history with stacks' },
        { id: 20, title: 'Monitoring function calls using a stack' }
      ]
    },
    {
      id: 8,
      title: 'Queues',
      subtopics: [
        { id: 1, title: 'Understanding queues and FIFO principle' },
        { id: 2, title: 'Array-based implementation of queues' },
        { id: 3, title: 'Linked list-based implementation of queues' },
        { id: 4, title: 'Circular queue implementation' },
        { id: 5, title: 'Common queue operations' },
        { id: 6, title: 'Applications of queues' },
        { id: 7, title: 'Priority queues' },
        { id: 8, title: 'Double-ended queues (Deques)' },
        { id: 9, title: 'Queue overflow and underflow' },
        { id: 10, title: 'Implementing a queue using stacks' },
        { id: 11, title: 'Simulation of real-life queue scenarios' },
        { id: 12, title: 'Queue applications in scheduling algorithms' },
        { id: 13, title: 'Multi-threaded queue implementation' },
        { id: 14, title: 'Queue management in network routers' },
        { id: 15, title: 'Task scheduling using queues' },
        { id: 16, title: 'Using queues for breadth-first search' },
        { id: 17, title: 'Implementing a print queue system' },
        { id: 18, title: 'Using queues for message passing in distributed systems' },
        { id: 19, title: 'Queue data structure in asynchronous programming' },
        { id: 20, title: 'Building an event-driven system with queues' }
      ]
    },
    {
      id: 9,
      title: 'Trees',
      subtopics: [
        { id: 1, title: 'Introduction to trees and their properties' },
        { id: 2, title: 'Binary trees and their representation' },
        { id: 3, title: 'Binary search trees (BST)' },
        { id: 4, title: 'AVL trees and balancing' },
        { id: 5, title: 'Red-Black trees' },
        { id: 6, title: 'Segment trees' },
        { id: 7, title: 'Tree traversals (in-order, pre-order, post-order)' },
        { id: 8, title: 'Level-order traversal' },
        { id: 9, title: 'Tree applications in databases' },
        { id: 10, title: 'Trie trees and their use in dictionaries' },
        { id: 11, title: 'B-trees and B+ trees' },
        { id: 12, title: 'Heaps (min-heap and max-heap)' },
        { id: 13, title: 'Tree-based searching algorithms' },
        { id: 14, title: 'Using trees for hierarchical data representation' },
        { id: 15, title: 'Tree compression algorithms' },
        { id: 16, title: 'Binary tree to binary search tree conversion' },
        { id: 17, title: 'Applications of trees in networking' },
        { id: 18, title: 'Using trees in file systems' },
        { id: 19, title: 'Handling dynamic data with trees' },
        { id: 20, title: 'Tree optimization techniques' }
      ]
    },
    {
      id: 10,
      title: 'Graphs',
      subtopics: [
        { id: 1, title: 'Introduction to graphs and their properties' },
        { id: 2, title: 'Graph representations (adjacency matrix and list)' },
        { id: 3, title: 'Graph traversal algorithms (DFS and BFS)' },
        { id: 4, title: 'Shortest path algorithms (Dijkstra\'s and Bellman-Ford)' },
        { id: 5, title: 'Minimum spanning tree algorithms (Prim\'s and Kruskal\'s)' },
        { id: 6, title: 'Graph coloring and its applications' },
        { id: 7, title: 'Network flow problems' },
        { id: 8, title: 'Applications of graphs in real life' },
        { id: 9, title: 'Handling cycles in graphs' },
        { id: 10, title: 'Topological sorting' },
        { id: 11, title: 'Graph algorithms in social networks' },
        { id: 12, title: 'Graph databases and their usage' },
        { id: 13, title: 'Dynamic graphs' },
        { id: 14, title: 'Graph matching algorithms' },
        { id: 15, title: 'Using graphs for routing protocols' },
        { id: 16, title: 'Graph-based data structures' },
        { id: 17, title: 'Applying graphs in machine learning' },
        { id: 18, title: 'Geometric graphs' },
        { id: 19, title: 'Graph theory in optimization problems' },
        { id: 20, title: 'Advanced applications of graph algorithms' }
      ]
    },
    {
      id: 11,
      title: 'Sorting Algorithms',
      description: 'Detailed study of various sorting algorithms, their implementations, and time complexities.',
      subtopics: [
        { id: 1, title: 'Introduction to sorting algorithms' },
        { id: 2, title: 'Bubble sort' },
        { id: 3, title: 'Selection sort' },
        { id: 4, title: 'Insertion sort' },
        { id: 5, title: 'Merge sort' },
        { id: 6, title: 'Quick sort' },
        { id: 7, title: 'Heap sort' },
        { id: 8, title: 'Radix sort' },
        { id: 9, title: 'Bucket sort' },
        { id: 10, title: 'Counting sort' },
        { id: 11, title: 'Shell sort' },
        { id: 12, title: 'Comb sort' },
        { id: 13, title: 'Tim sort' },
        { id: 14, title: 'Cycle sort' },
        { id: 15, title: 'Stooge sort' },
        { id: 16, title: 'Bitonic sort' },
        { id: 17, title: 'External sorting' },
        { id: 18, title: 'Introduction to time complexity' },
        { id: 19, title: 'Comparative analysis of sorting algorithms' },
        { id: 20, title: 'Applications of sorting algorithms' }
      ]
    },
    {
      id: 12,
      title: 'Searching Algorithms',
      description: 'Study of various searching algorithms and their efficiency.',
      subtopics: [
        { id: 1, title: 'Introduction to searching algorithms' },
        { id: 2, title: 'Linear search' },
        { id: 3, title: 'Binary search' },
        { id: 4, title: 'Ternary search' },
        { id: 5, title: 'Jump search' },
        { id: 6, title: 'Exponential search' },
        { id: 7, title: 'Fibonacci search' },
        { id: 8, title: 'Interpolation search' },
        { id: 9, title: 'Search algorithms on sorted arrays' },
        { id: 10, title: 'Search algorithms on linked lists' },
        { id: 11, title: 'Searching in trees' },
        { id: 12, title: 'Searching in graphs' },
        { id: 13, title: 'Search algorithms in databases' },
        { id: 14, title: 'Applications of searching algorithms' },
        { id: 15, title: 'Searching in hash tables' },
        { id: 16, title: 'Common search problems' },
        { id: 17, title: 'Search algorithms in AI' },
        { id: 18, title: 'Advanced search techniques' },
        { id: 19, title: 'Comparison of searching algorithms' },
        { id: 20, title: 'Real-world applications of searching algorithms' }
      ]
    },
    {
      id: 13,
      title: 'Hashing',
      description: 'Introduction to hashing, hash functions, and their applications.',
      subtopics: [
        { id: 1, title: 'Introduction to hashing' },
        { id: 2, title: 'Hash functions' },
        { id: 3, title: 'Collision resolution techniques' },
        { id: 4, title: 'Open addressing' },
        { id: 5, title: 'Separate chaining' },
        { id: 6, title: 'Applications of hashing' },
        { id: 7, title: 'Hash tables' },
        { id: 8, title: 'Performance analysis of hash functions' },
        { id: 9, title: 'Cryptographic hash functions' },
        { id: 10, title: 'Hashing in databases' },
        { id: 11, title: 'Using hashing for data retrieval' },
        { id: 12, title: 'Hashing techniques in C' },
        { id: 13, title: 'Dynamic hashing' },
        { id: 14, title: 'Consistent hashing' },
        { id: 15, title: 'Real-world examples of hashing' },
        { id: 16, title: 'Hashing in network security' },
        { id: 17, title: 'Evaluating hash function performance' },
        { id: 18, title: 'Common hashing algorithms' },
        { id: 19, title: 'Using hashes in web applications' },
        { id: 20, title: 'Implementing a hash table in C' }
      ]
    },
    {
      id: 14,
      title: 'Dynamic Programming',
      description: 'An introduction to dynamic programming and its applications in solving complex problems efficiently.',
      subtopics: [
        { id: 1, title: 'Introduction to dynamic programming' },
        { id: 2, title: 'Principles of dynamic programming' },
        { id: 3, title: 'Top-down vs bottom-up approach' },
        { id: 4, title: 'Memoization techniques' },
        { id: 5, title: 'Common dynamic programming problems' },
        { id: 6, title: 'Fibonacci sequence using dynamic programming' },
        { id: 7, title: 'Knapsack problem' },
        { id: 8, title: 'Longest common subsequence' },
        { id: 9, title: 'Matrix chain multiplication' },
        { id: 10, title: 'Coin change problem' },
        { id: 11, title: 'Dynamic programming in game theory' },
        { id: 12, title: 'Applications of dynamic programming' },
        { id: 13, title: 'Dynamic programming in AI' },
        { id: 14, title: 'Graph algorithms using dynamic programming' },
        { id: 15, title: 'String manipulation problems' },
        { id: 16, title: 'Advanced dynamic programming techniques' },
        { id: 17, title: 'Dynamic programming in machine learning' },
        { id: 18, title: 'Real-world applications of dynamic programming' },
        { id: 19, title: 'Common mistakes in dynamic programming' },
        { id: 20, title: 'Dynamic programming in competitive programming' }
      ]
    },
    {
      id: 15,
      title: 'Greedy Algorithms',
      description: 'Study of greedy algorithms, their characteristics, and applications.',
      subtopics: [
        { id: 1, title: 'Introduction to greedy algorithms' },
        { id: 2, title: 'Characteristics of greedy algorithms' },
        { id: 3, title: 'Greedy approach vs dynamic programming' },
        { id: 4, title: 'Common greedy problems' },
        { id: 5, title: 'Activity selection problem' },
        { id: 6, title: 'Fractional knapsack problem' },
        { id: 7, title: 'Huffman coding' },
        { id: 8, title: 'Prim\'s algorithm' },
        { id: 9, title: 'Kruskal\'s algorithm' },
        { id: 10, title: 'Greedy algorithms in real life' },
        { id: 11, title: 'Greedy algorithms in optimization problems' },
        { id: 12, title: 'Applications of greedy algorithms' },
        { id: 13, title: 'Analyzing greedy algorithms' },
        { id: 14, title: 'Common mistakes with greedy algorithms' },
        { id: 15, title: 'Greedy algorithms in competitive programming' },
        { id: 16, title: 'Greedy algorithms in graph theory' },
        { id: 17, title: 'Advanced greedy techniques' },
        { id: 18, title: 'Greedy algorithms for scheduling' },
        { id: 19, title: 'Greedy algorithms in networking' },
        { id: 20, title: 'Real-world applications of greedy algorithms' }
      ]
    },
    {
      id: 16,
      title: 'Backtracking',
      description: 'Understanding backtracking algorithms and their applications in solving problems with multiple solutions.',
      subtopics: [
        { id: 1, title: 'Introduction to backtracking' },
        { id: 2, title: 'Principles of backtracking' },
        { id: 3, title: 'Backtracking vs brute force' },
        { id: 4, title: 'Common backtracking problems' },
        { id: 5, title: 'N-Queens problem' },
        { id: 6, title: 'Sudoku solver' },
        { id: 7, title: 'Subset sum problem' },
        { id: 8, title: 'Permutations and combinations' },
        { id: 9, title: 'Graph coloring problem' },
        { id: 10, title: 'Rat in a maze problem' },
        { id: 11, title: 'Backtracking in game theory' },
        { id: 12, title: 'Applications of backtracking' },
        { id: 13, title: 'Backtracking in AI' },
        { id: 14, title: 'Performance analysis of backtracking algorithms' },
        { id: 15, title: 'Common mistakes in backtracking' },
        { id: 16, title: 'Backtracking in competitive programming' },
        { id: 17, title: 'Advanced backtracking techniques' },
        { id: 18, title: 'Backtracking in optimization problems' },
        { id: 19, title: 'Real-world applications of backtracking' },
        { id: 20, title: 'Using backtracking for problem-solving' }
      ]
    }
    
  ],
  
};
const Page = () => {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<number | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [studentResponse, setStudentResponse] = useState<string>("");
  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(Number(event.target.value));
    setSelectedSubtopic(null); // Reset subtopic when topic changes
  };

  const handleSubtopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubtopic(Number(event.target.value));
  };
  const fetchQuestions = async () => {
    if (selectedSubtopic !== null) {
      const subtopic = courseStructure.topics.find((chapter) => 
        chapter.id === selectedTopic
      )?.subtopics.find((sub) => sub.id === selectedSubtopic);
  
      if (subtopic) {
        try {
          // Ensure API key is defined
          const apiKey = "Your api key";
          
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt="Explain deque"          
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const output = await response.text();
  
          // Assuming output should be split into an array of strings
          setQuestions(output.split('\n')); // Change this based on how you want to structure questions
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }
    }
  };
  

  return (
    <div style={{ color: 'white', backgroundColor: '#121212', minHeight: '100vh', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Data Structures and Algorithms</h1>
      
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <label style={{ marginRight: '10px' }}>
          Select a Topic:
          <select 
            onChange={handleTopicChange} 
            defaultValue="" 
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', backgroundColor: '#1e1e1e', color: 'white' }}
          >
            <option value="" disabled>Select a topic</option>
            {courseStructure.topics.map(chapter => (
              <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
            ))}
          </select>
        </label>
      </div>
  
      {selectedTopic !== null && (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <label style={{ marginRight: '10px' }}>
            Select a Subtopic:
            <select 
              onChange={handleSubtopicChange} 
              defaultValue="" 
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', backgroundColor: '#1e1e1e', color: 'white' }}
            >
              <option value="" disabled>Select a subtopic</option>
              {courseStructure.topics.find(chapter => chapter.id === selectedTopic)?.subtopics.map(subtopic => (
                <option key={subtopic.id} value={subtopic.id}>{subtopic.title}</option>
              ))}
            </select>
          </label>
        </div>
      )}
  
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <textarea
          rows={4} 
          cols={50} 
          value={studentResponse}
          onChange={(e) => setStudentResponse(e.target.value)}
          placeholder="Enter your response here..."
          style={{ 
            width: '80%', 
            padding: '10px', 
            borderRadius: '5px', 
            backgroundColor: '#1e1e1e', 
            color: 'white',
            border: '1px solid #444' 
          }}
        />
      </div>
  
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={fetchQuestions} 
          disabled={selectedSubtopic === null}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '5px', 
            backgroundColor: '#6200ea', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s ease' 
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3700b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6200ea'}
        >
          Ask Questions
        </button>
      </div>
  
      {questions.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <h2>Questions:</h2>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {questions.map((question, index) => (
              <li key={index} style={{ background: '#1e1e1e', borderRadius: '5px', padding: '10px', margin: '5px 0' }}>
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Page;
