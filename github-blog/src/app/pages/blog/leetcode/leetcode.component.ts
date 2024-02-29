import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TagComponent } from 'src/app/shared/tag/tag.component';

const problems: { no: number; title: string, level?: string }[] = [
  { no: 1, title: "Two Sum", level: "Easy"},
  { no: 2, title: "Longest Substring Without Repeating Characters", level: "Medium"},
  { no: 3, title: "Longest Palindromic Substring", level: "Medium"},
  { no: 4, title: "Container With Most Water", level: "Medium" },
  { no: 5, title: "3Sum", level: "Medium" },
  { no: 6, title: "Remove Nth Node From End of List" },
  { no: 7, title: "Valid Parentheses" },
  { no: 8, title: "Merge Two Sorted Lists" },
  { no: 9, title: "Merge k Sorted Lists" },
  { no: 10, title: "Search in Rotated Sorted Array" },
  { no: 11, title: "Combination Sum" },
  { no: 12, title: "Rotate Image" },
  { no: 13, title: "Group Anagrams" },
  { no: 14, title: "Maximum Subarray" },
  { no: 15, title: "Spiral Matrix" },
  { no: 16, title: "Jump Game" },
  { no: 17, title: "Merge Intervals" },
  { no: 18, title: "Insert Interval" },
  { no: 19, title: "Unique Paths" },
  { no: 20, title: "Climbing Stairs" },
  { no: 21, title: "Set Matrix Zeroes" },
  { no: 22, title: "Minimum Window Substring" },
  { no: 23, title: "Word Search" },
  { no: 24, title: "Decode Ways" },
  { no: 25, title: "Validate Binary Search Tree" },
  { no: 26, title: "Same Tree" },
  { no: 27, title: "Binary Tree Level Order Traversal" },
  { no: 28, title: "Maximum Depth of Binary Tree" },
  { no: 29, title: "Construct Binary Tree from Preorder and Inorder Traversal" },
  { no: 30, title: "Best Time to Buy and Sell Stock" },
  { no: 31, title: "Binary Tree Maximum Path Sum" },
  { no: 32, title: "Valid Palindrome" },
  { no: 33, title: "Longest Consecutive Sequence" },
  { no: 34, title: "Clone Graph" },
  { no: 35, title: "Word Break" },
  { no: 36, title: "Linked List Cycle" },
  { no: 37, title: "Reorder List" },
  { no: 38, title: "Maximum Product Subarray" },
  { no: 39, title: "Find Minimum in Rotated Sorted Array" },
  { no: 40, title: "Reverse Bits" },
  { no: 41, title: "Number of 1 Bits" },
  { no: 42, title: "House Robber" },
  { no: 43, title: "Number of Islands" },
  { no: 44, title: "Reverse Linked List" },
  { no: 45, title: "Course Schedule" },
  { no: 46, title: "Implement Trie (Prefix Tree)" },
  { no: 47, title: "Design Add and Search Words Data Structure" },
  { no: 48, title: "Word Search II" },
  { no: 49, title: "House Robber II" },
  { no: 50, title: "Contains Duplicate" },
];
@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [
    //Angular module
    CommonModule,
    RouterModule,

    //Material module
    MatTableModule,
    MatSortModule,

    //Custom module
    TagComponent,
  ],
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LeetcodeComponent {
  displayedColumns: string[] = ['no', 'title', 'level'];
  dataSource = new MatTableDataSource(problems);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getColorByLevel(level: string): string {
    const colorMap: { [key: string]: string } = {
      'Easy': 'green',
      'Medium': 'darkgoldenrod',
      'Hard': 'red',
    };

    return colorMap[level] || 'blue'; // Default to blue if level is not recognized
  }

  convertToSolutionUrl(title: string) {
    return './solution/' + title.toLowerCase().replace(/ /g, '-');
  }

}
