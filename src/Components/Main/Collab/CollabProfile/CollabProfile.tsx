import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import { Link } from '@mui/joy';
import { Card } from '@mui/joy';
import { Chip } from '@mui/joy';
import { Typography } from '@mui/joy';
import { UsersModel } from '../../../../model/TaskModel';

export default function CollabProfile({ user }: { user: UsersModel }) {
    return (
        <div className='CollabProfile'>

            <Card
                variant="outlined"
                row
                sx={{
                    width: 320,
                    height: 80,
                    gap: 2,
                    backgroundColor: 'white',
                    border: 'none',
                    boxShadow: 3,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
            >
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                        srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <div>
                    <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
                        <b> {`@${user.username}`}</b>
                    </Typography>
                    <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
                        <Link
                            overlay
                            underline="none"
                            href="#interactive-card"
                            sx={{ color: 'text.tertiary' }}
                        >
                            {`${user.firstName} ${user.lastName}`}
                        </Link>
                    </Typography>
                </div>
                <div className='CollabProfileBtn'>

                    <button style={{ borderRadius: '5px', padding: '8px', border: 'none', backgroundColor: "#FF725E" }}>Add Friend</button>
                </div>
            </Card>
        </div>
    );
}