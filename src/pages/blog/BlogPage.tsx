import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Chip,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Hướng Dẫn Chăm Sóc Sức Khỏe Tâm Thần Trong Quá Trình Chuyển Đổi",
    excerpt:
      "Khám phá các phương pháp hiệu quả để duy trì sức khỏe tâm thần tốt trong hành trình khẳng định bản thân và tìm hiểu cách đối phó với stress...",
    content: "Nội dung chi tiết của bài viết về chăm sóc sức khỏe tâm thần...",
    image: "/mental.png",
    author: "Dr. Nguyễn Thị Hương",
    date: "15/12/2024",
    category: "Sức khỏe tâm thần",
    readTime: "5 phút",
    tags: ["tâm thần", "chuyển đổi", "hỗ trợ"],
  },
  {
    id: 2,
    title: "Dinh Dưỡng Cân Bằng Cho Sức Khỏe Tối Ưu",
    excerpt:
      "Tìm hiểu về chế độ ăn uống khoa học giúp tăng cường sức khỏe, hỗ trợ quá trình điều trị và cung cấp năng lượng cho cơ thể...",
    content: "Nội dung chi tiết về dinh dưỡng...",
    image: "/primaryhealthy.png",
    author: "Dr. Trần Văn Minh",
    date: "12/12/2024",
    category: "Dinh dưỡng",
    readTime: "7 phút",
    tags: ["dinh dưỡng", "sức khỏe", "ăn uống"],
  },
  {
    id: 3,
    title: "Tập Luyện Thể Chất An Toàn Và Hiệu Quả",
    excerpt:
      "Các bài tập phù hợp giúp tăng cường sức mạnh, cải thiện sức khỏe tổng thể và duy trì thể trạng tốt trong quá trình điều trị...",
    content: "Nội dung chi tiết về tập luyện...",
    image: "/genderaff.png",
    author: "Dr. Lê Thị Anh",
    date: "10/12/2024",
    category: "Thể dục",
    readTime: "6 phút",
    tags: ["thể dục", "tập luyện", "sức khỏe"],
  },
  {
    id: 4,
    title: "Quản Lý Stress Trong Cuộc Sống Hiện Đại",
    excerpt:
      "Các kỹ thuật thư giãn và quản lý stress hiệu quả cho cuộc sống hàng ngày, giúp cải thiện chất lượng cuộc sống và sức khỏe tinh thần...",
    content: "Nội dung chi tiết về quản lý stress...",
    image: "/counseling.svg",
    author: "Dr. Phạm Văn Hùng",
    date: "08/12/2024",
    category: "Sức khỏe tâm thần",
    readTime: "4 phút",
    tags: ["stress", "thư giãn", "tâm thần"],
  },
  {
    id: 5,
    title: "Chăm Sóc Da Và Làm Đẹp Tự Nhiên",
    excerpt:
      "Hướng dẫn chăm sóc da an toàn và hiệu quả phù hợp với mọi loại da, sử dụng các phương pháp tự nhiên không gây hại...",
    content: "Nội dung chi tiết về chăm sóc da...",
    image: "/service-1.svg",
    author: "Dr. Hoàng Thị Lan",
    date: "05/12/2024",
    category: "Chăm sóc da",
    readTime: "8 phút",
    tags: ["chăm sóc da", "làm đẹp", "tự nhiên"],
  },
  {
    id: 6,
    title: "Xây Dựng Lối Sống Lành Mạnh Bền Vững",
    excerpt:
      "Các thói quen tốt giúp duy trì sức khỏe lâu dài, cải thiện chất lượng cuộc sống và tạo nền tảng vững chắc cho sức khỏe tổng thể...",
    content: "Nội dung chi tiết về lối sống...",
    image: "/service-2.svg",
    author: "Dr. Vũ Thị Mai",
    date: "03/12/2024",
    category: "Lối sống",
    readTime: "9 phút",
    tags: ["lối sống", "thói quen", "bền vững"],
  },
  {
    id: 7,
    title: "Hiểu Biết Về Liệu Pháp Hormone An Toàn",
    excerpt:
      "Tìm hiểu về các loại hormone therapy, tác dụng phụ và cách theo dõi sức khỏe trong quá trình điều trị hormone...",
    content: "Nội dung chi tiết về liệu pháp hormone...",
    image: "/hormone-therapy.svg",
    author: "Dr. Ngô Minh Tuấn",
    date: "01/12/2024",
    category: "Điều trị hormone",
    readTime: "10 phút",
    tags: ["hormone", "điều trị", "an toàn"],
  },
  {
    id: 8,
    title: "Kỹ Thuật Thở Và Thiền Định Cho Sức Khỏe",
    excerpt:
      "Học các kỹ thuật thở đúng cách và thiền định để giảm căng thẳng, cải thiện tập trung và tăng cường sức khỏe tinh thần...",
    content: "Nội dung chi tiết về kỹ thuật thở và thiền...",
    image: "/mental.png",
    author: "Dr. Lý Thanh Hoa",
    date: "28/11/2024",
    category: "Sức khỏe tâm thần",
    readTime: "6 phút",
    tags: ["thiền", "thở", "tập trung"],
  },
  {
    id: 9,
    title: "Chăm Sóc Sức Khỏe Sinh Sản An Toàn",
    excerpt:
      "Hướng dẫn chăm sóc sức khỏe sinh sản, các biện pháp phòng ngừa và kiểm tra định kỳ quan trọng cho mọi độ tuổi...",
    content: "Nội dung chi tiết về sức khỏe sinh sản...",
    image: "/service-3.svg",
    author: "Dr. Đỗ Thị Minh",
    date: "25/11/2024",
    category: "Sức khỏe sinh sản",
    readTime: "8 phút",
    tags: ["sinh sản", "phòng ngừa", "kiểm tra"],
  },
  {
    id: 10,
    title: "Giấc Ngủ Chất Lượng - Chìa Khóa Sức Khỏe",
    excerpt:
      "Tầm quan trọng của giấc ngủ đối với sức khỏe, cách cải thiện chất lượng giấc ngủ và các rối loạn giấc ngủ phổ biến...",
    content: "Nội dung chi tiết về giấc ngủ...",
    image: "/primaryhealthy.png",
    author: "Dr. Bùi Văn Nam",
    date: "22/11/2024",
    category: "Lối sống",
    readTime: "7 phút",
    tags: ["giấc ngủ", "chất lượng", "rối loạn"],
  },
  {
    id: 11,
    title: "Xây Dựng Mối Quan Hệ Lành Mạnh",
    excerpt:
      "Cách xây dựng và duy trì các mối quan hệ tích cực, giao tiếp hiệu quả và tạo không gian an toàn cho bản thân...",
    content: "Nội dung chi tiết về mối quan hệ...",
    image: "/counseling.svg",
    author: "Dr. Trịnh Thị Hằng",
    date: "20/11/2024",
    category: "Sức khỏe tâm thần",
    readTime: "9 phút",
    tags: ["mối quan hệ", "giao tiếp", "an toàn"],
  },
  {
    id: 12,
    title: "Yoga Và Pilates Cho Người Mới Bắt Đầu",
    excerpt:
      "Các bài tập yoga và pilates cơ bản giúp tăng cường sự linh hoạt, cải thiện tư thế và giảm đau lưng hiệu quả...",
    content: "Nội dung chi tiết về yoga và pilates...",
    image: "/genderaff.png",
    author: "Dr. Huỳnh Minh Châu",
    date: "18/11/2024",
    category: "Thể dục",
    readTime: "12 phút",
    tags: ["yoga", "pilates", "linh hoạt"],
  },
];

const categories = [
  "Tất cả",
  "Sức khỏe tâm thần",
  "Dinh dưỡng",
  "Thể dục",
  "Chăm sóc da",
  "Lối sống",
  "Điều trị hormone",
  "Sức khỏe sinh sản",
];

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "Tất cả" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Blog Sức Khỏe
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Khám phá các bài viết hữu ích về chăm sóc sức khỏe và lối sống lành
            mạnh
          </Typography>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Danh mục"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {currentPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: 500,
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "calc(100% - 200px)",
                  }}
                >
                  <Chip
                    label={post.category}
                    size="small"
                    color="primary"
                    sx={{ alignSelf: "flex-start", mb: 2 }}
                  />
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: "3em",
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Box sx={{ mt: "auto" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <PersonIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {post.author}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {post.readTime} • {post.date}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: 2,
                      }}
                    >
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: "0.7rem" }}
                        />
                      ))}
                    </Box>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Đọc thêm
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* No Results */}
        {currentPosts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy bài viết nào phù hợp với tìm kiếm của bạn.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogPage;
