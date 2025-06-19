import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Container,
  Chip,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Hướng Dẫn Chăm Sóc Sức Khỏe Tâm Thần Trong Quá Trình Chuyển Đổi",
    excerpt:
      "Khám phá các phương pháp hiệu quả để duy trì sức khỏe tâm thần tốt trong hành trình khẳng định bản thân và tìm hiểu cách đối phó với stress...",
    image: "/mental.png",
    author: "Dr. Nguyễn Thị Hương",
    date: "15/12/2024",
    category: "Sức khỏe tâm thần",
    readTime: "5 phút",
  },
  {
    id: 2,
    title: "Dinh Dưỡng Cân Bằng Cho Sức Khỏe Tối Ưu",
    excerpt:
      "Tìm hiểu về chế độ ăn uống khoa học giúp tăng cường sức khỏe, hỗ trợ quá trình điều trị và cung cấp năng lượng cho cơ thể...",
    image: "/primaryhealthy.png",
    author: "Dr. Trần Văn Minh",
    date: "12/12/2024",
    category: "Dinh dưỡng",
    readTime: "7 phút",
  },
  {
    id: 3,
    title: "Tập Luyện Thể Chất An Toàn Và Hiệu Quả",
    excerpt:
      "Các bài tập phù hợp giúp tăng cường sức mạnh, cải thiện sức khỏe tổng thể và duy trì thể trạng tốt trong quá trình điều trị...",
    image: "/genderaff.png",
    author: "Dr. Lê Thị Anh",
    date: "10/12/2024",
    category: "Thể dục",
    readTime: "6 phút",
  },
  {
    id: 4,
    title: "Quản Lý Stress Trong Cuộc Sống Hiện Đại",
    excerpt:
      "Các kỹ thuật thư giãn và quản lý stress hiệu quả cho cuộc sống hàng ngày, giúp cải thiện chất lượng cuộc sống và sức khỏe tinh thần...",
    image: "/counseling.svg",
    author: "Dr. Phạm Văn Hùng",
    date: "08/12/2024",
    category: "Sức khỏe tâm thần",
    readTime: "4 phút",
  },
  {
    id: 5,
    title: "Chăm Sóc Da Và Làm Đẹp Tự Nhiên",
    excerpt:
      "Hướng dẫn chăm sóc da an toàn và hiệu quả phù hợp với mọi loại da, sử dụng các phương pháp tự nhiên không gây hại...",
    image: "/service-1.svg",
    author: "Dr. Hoàng Thị Lan",
    date: "05/12/2024",
    category: "Chăm sóc da",
    readTime: "8 phút",
  },
  {
    id: 6,
    title: "Xây Dựng Lối Sống Lành Mạnh Bền Vững",
    excerpt:
      "Các thói quen tốt giúp duy trì sức khỏe lâu dài, cải thiện chất lượng cuộc sống và tạo nền tảng vững chắc cho sức khỏe tổng thể...",
    image: "/service-2.svg",
    author: "Dr. Vũ Thị Mai",
    date: "03/12/2024",
    category: "Lối sống",
    readTime: "9 phút",
  },
  {
    id: 7,
    title: "Hiểu Biết Về Liệu Pháp Hormone An Toàn",
    excerpt:
      "Tìm hiểu về các loại hormone therapy, tác dụng phụ và cách theo dõi sức khỏe trong quá trình điều trị hormone...",
    image: "/hormone-therapy.svg",
    author: "Dr. Ngô Minh Tuấn",
    date: "01/12/2024",
    category: "Điều trị hormone",
    readTime: "10 phút",
  },
  {
    id: 8,
    title: "Kỹ Thuật Thở Và Thiền Định Cho Sức Khỏe",
    excerpt:
      "Học các kỹ thuật thở đúng cách và thiền định để giảm căng thẳng, cải thiện tập trung và tăng cường sức khỏe tinh thần...",
    image: "/mental.png",
    author: "Dr. Lý Thanh Hoa",
    date: "28/11/2024",
    category: "Sức khỏe tâm thần",
    readTime: "6 phút",
  },
  {
    id: 9,
    title: "Chăm Sóc Sức Khỏe Sinh Sản An Toàn",
    excerpt:
      "Hướng dẫn chăm sóc sức khỏe sinh sản, các biện pháp phòng ngừa và kiểm tra định kỳ quan trọng cho mọi độ tuổi...",
    image: "/service-3.svg",
    author: "Dr. Đỗ Thị Minh",
    date: "25/11/2024",
    category: "Sức khỏe sinh sản",
    readTime: "8 phút",
  },
  {
    id: 10,
    title: "Giấc Ngủ Chất Lượng - Chìa Khóa Sức Khỏe",
    excerpt:
      "Tầm quan trọng của giấc ngủ đối với sức khỏe, cách cải thiện chất lượng giấc ngủ và các rối loạn giấc ngủ phổ biến...",
    image: "/primaryhealthy.png",
    author: "Dr. Bùi Văn Nam",
    date: "22/11/2024",
    category: "Lối sống",
    readTime: "7 phút",
  },
  {
    id: 11,
    title: "Xây Dựng Mối Quan Hệ Lành Mạnh",
    excerpt:
      "Cách xây dựng và duy trì các mối quan hệ tích cực, giao tiếp hiệu quả và tạo không gian an toàn cho bản thân...",
    image: "/counseling.svg",
    author: "Dr. Trịnh Thị Hằng",
    date: "20/11/2024",
    category: "Sức khỏe tâm thần",
    readTime: "9 phút",
  },
  {
    id: 12,
    title: "Yoga Và Pilates Cho Người Mới Bắt Đầu",
    excerpt:
      "Các bài tập yoga và pilates cơ bản giúp tăng cường sự linh hoạt, cải thiện tư thế và giảm đau lưng hiệu quả...",
    image: "/genderaff.png",
    author: "Dr. Huỳnh Minh Châu",
    date: "18/11/2024",
    category: "Thể dục",
    readTime: "12 phút",
  },
];

const BlogSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Số lượng blog hiển thị theo kích thước màn hình
  const getPostsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 600) return 1; // mobile
      if (window.innerWidth < 960) return 2; // tablet
      return 3; // desktop
    }
    return 3; // default
  };

  const [postsPerView, setPostsPerView] = useState(getPostsPerView());

  // Cập nhật số lượng blog khi resize
  React.useEffect(() => {
    const handleResize = () => {
      setPostsPerView(getPostsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + postsPerView >= blogPosts.length
        ? 0
        : prevIndex + postsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - postsPerView < 0
        ? Math.max(0, blogPosts.length - postsPerView)
        : prevIndex - postsPerView
    );
  };

  const visiblePosts = blogPosts.slice(
    currentIndex,
    currentIndex + postsPerView
  );

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Blog Sức Khỏe
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Khám phá các bài viết hữu ích về chăm sóc sức khỏe và lối sống lành
          mạnh
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Navigation Buttons - Hidden on mobile */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: "absolute",
              left: { xs: -10, sm: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              boxShadow: 2,
              zIndex: 1,
              display: { xs: "none", md: "flex" },
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: "absolute",
              right: { xs: -10, sm: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              boxShadow: 2,
              zIndex: 1,
              display: { xs: "none", md: "flex" },
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Blog Cards */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3 },
              justifyContent: "center",
              flexWrap: { xs: "nowrap", md: "nowrap" },
              overflow: "hidden",
              alignItems: "stretch",
            }}
          >
            {visiblePosts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: postsPerView === 2 ? "calc(50% - 12px)" : "100%",
                    md: "calc(33.333% - 16px)",
                  },
                  minWidth: {
                    xs: "100%",
                    sm: postsPerView === 2 ? "calc(50% - 12px)" : "100%",
                    md: "calc(33.333% - 16px)",
                  },
                  maxWidth: {
                    xs: "100%",
                    sm: postsPerView === 2 ? "calc(50% - 12px)" : "100%",
                    md: "calc(33.333% - 16px)",
                  },
                  height: "auto",
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
            ))}
          </Box>

          {/* Mobile Navigation Buttons */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              mt: 4,
              gap: 2,
            }}
          >
            <IconButton
              onClick={prevSlide}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={nextSlide}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* Dots Indicator */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}
          >
            {Array.from({
              length: Math.ceil(blogPosts.length / postsPerView),
            }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor:
                    currentIndex === index * postsPerView
                      ? "primary.main"
                      : "grey.300",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                onClick={() => setCurrentIndex(index * postsPerView)}
              />
            ))}
          </Box>

          {/* View All Button - Mềm mãi hơn */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/blog"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 25,
                fontSize: "1.1rem",
                fontWeight: 500,
                textTransform: "none",
                background: "linear-gradient(45deg, #7E57C2 30%, #26A69A 90%)",
                boxShadow: "0 4px 20px rgba(126, 87, 194, 0.3)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0 8px 30px rgba(126, 87, 194, 0.4)",
                  background:
                    "linear-gradient(45deg, #9575CD 30%, #4DB6AC 90%)",
                },
                "&:active": {
                  transform: "translateY(-1px) scale(1.02)",
                },
              }}
            >
              Xem tất cả bài viết
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogSlider;
